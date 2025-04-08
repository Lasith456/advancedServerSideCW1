import express from "express";
import {register,login,genarateApiKey,apiUsage,getAllUsers,updateUserRole,deleteUser} from "../controllers/authController.js"
import { IsUser } from "../middleware/verifyUser.js";

const AuthRoutes = express.Router();

AuthRoutes.post("/register", register);
AuthRoutes.post("/authenticate", login);
AuthRoutes.post("/genarateApiKey",IsUser,genarateApiKey);
AuthRoutes.get("/apiUsage",IsUser,apiUsage);
AuthRoutes.get('/users',getAllUsers);
AuthRoutes.put('/user/:id/role',updateUserRole);
AuthRoutes.delete('/user/:id',deleteUser);
export default AuthRoutes; 