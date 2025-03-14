import express from "express";
import {register,login,genarateApiKey} from "../controllers/authController.js"
import { IsUser } from "../middleware/verifyUser.js";

const AuthRoutes = express.Router();

AuthRoutes.post("/register", register);
AuthRoutes.post("/login", login);
AuthRoutes.post("/genarateApiKey",IsUser,genarateApiKey);

export default AuthRoutes;