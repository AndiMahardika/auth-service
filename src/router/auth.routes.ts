import express from "express";
import AuthController from "../controllers/auth.controller";
import AuthMiddleware from "../middleware/auth.middleware";

const AuthRouter = express.Router();

AuthRouter.post('/register', AuthController.handleUserRegister)
AuthRouter.post('/login', AuthController.handleUserLogin)
AuthRouter.patch('/update/:id', AuthMiddleware, AuthController.handleUserUpdate)

export default AuthRouter