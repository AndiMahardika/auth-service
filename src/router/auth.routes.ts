import express from "express";
import AuthController from "../controllers/auth.controller";

const AuthRouter = express.Router();

AuthRouter.post('/register', AuthController.handleUserRegister)
AuthRouter.post('/login', AuthController.handleUserLogin)
AuthRouter.patch('/update/:id', AuthController.handleUserUpdate)

export default AuthRouter