import bcryptjs from 'bcryptjs';
import userDao from '../dao/userDao.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from "uuid";
import {genarateHash} from "../utilities/bcryptjsUtil.js";
dotenv.config();
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const existingUser = await userDao.findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already registered" });
        }
        
        const hashedPassword = await genarateHash(password);
        
        const userId = await userDao.createUser(name, email, hashedPassword);

        res.status(201).json({ success: true, message: "User registered successfully", userId });
    } catch (error) {
        console.error("Error in register:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
const login = async (req, res) => {
    try {
        const { email,password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        const user = await userDao.findUserByEmail(email);
        if(!user){
            return res.status(400).json({success:false, message:"User Not Found!"});
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(404).json({ success: false, message: "Invalid credentials" });
        }
        const token = jwt.sign({ email: user.email,role: user.userRole }, process.env.JWT_SECRET, { expiresIn: '1m' });
        const refreshToken = jwt.sign({ email: user.email }, process.env.JWT_REFRESH_SECRET, { expiresIn: '60m' });
        res.cookie("accessToken", token, {maxAge: 60000});
        res.cookie("refreshToken", refreshToken, {httpOnly: true,secure: true, sameSite: "strict",maxAge: 360000});
        if(user.userRole==1){
            res.status(200).json({ success: true, message: "User Login successfully",role:"admin" });

        }else{
            res.status(200).json({ success: true, message: "User Login successfully",role:"user" });
        }
    } catch (error) {
        console.error("Error in register:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
const genarateApiKey = async (req, res) => {
    try {
        const { email,password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        const user = await userDao.findUserByEmail(email);
        if(!user){
            return  res.status(400).json({success:false, message:"User Not Fpund!"});
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(404).json({ success: false, message: "Invalid credentials" });
        }
        const APIKey = uuidv4().toUpperCase().replace(/-/g, "").match(/.{1,4}/g).join("-");
        const hashedAPIKey = await genarateHash(APIKey);
        const expiresAt = new Date();
        expiresAt.setFullYear(expiresAt.getFullYear() + 1);
        const deleteUser= await userDao.deleteLastApiKey(user.id);
        const keyId = await userDao.storeUserAPIKey(user.id, hashedAPIKey, expiresAt);
        res.status(201).json({ success: true, message: "API Key Genarated successfully", APIKey,keyId });
    } catch (error) {
        console.error("Error in register:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
const apiUsage = async (req, res) => {
    try {
        const stats = await userDao.getAllApiKeyStats();
        return res.status(200).json({ data: stats });
    } catch (error) {
        console.error("Error in register:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
const getAllUsers = async (req, res) => {
    try {
      const users = await userDao.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error('Get users error:', error);
      res.status(500).json({ message: 'Failed to get users' });
    }
  }

  const updateUserRole = async (req, res) => {
    const userId = req.params.id;
    const { role } = req.body;

    if (typeof role !== 'number' || ![0, 1].includes(role)) {
      return res.status(400).json({ message: 'Invalid role value' });
    }
  
    try {
      await userDao.updateUserRole(userId, role);
      res.status(200).json({ message: 'User role updated successfully' });
    } catch (error) {
      console.error('Update role error:', error);
      res.status(500).json({ message: 'Failed to update user role' });
    }
  }
  

  const deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
      await userDao.deleteUserById(userId);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Delete user error:', error);
      res.status(500).json({ message: 'Failed to delete user' });
    }
  }
export { register,login,genarateApiKey,apiUsage,updateUserRole,deleteUser,getAllUsers };