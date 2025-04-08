import express from "express";
import {register,login,genarateApiKey,apiUsage,getAllUsers,updateUserRole,deleteUser} from "../controllers/authController.js"
import { IsUser,IsAdmin } from "../middleware/verifyUser.js";
import { apiKeyValidation } from "../middleware/apiKeyValidation.js";

const AuthRoutes = express.Router();

AuthRoutes.post("/register", register);
AuthRoutes.post("/authenticate",login);
AuthRoutes.post("/genarateApiKey",IsUser,IsAdmin,genarateApiKey);
AuthRoutes.get("/apiUsage",IsUser,IsAdmin,apiUsage);
AuthRoutes.get('/users',IsUser,IsAdmin,getAllUsers);
AuthRoutes.put('/user/:id/role',IsUser,IsAdmin,updateUserRole);
AuthRoutes.delete('/user/:id',IsUser,IsAdmin,deleteUser);
export default AuthRoutes; 