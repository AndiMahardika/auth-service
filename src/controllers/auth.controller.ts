import { Request, Response } from "express";
import AuthService from "../services/auth.service";

const AuthController = {
  handleUserRegister: async (req: Request, res: Response) => {
    const { name, password, email, role } = req.body;
    
    try {
      const newUser = await AuthService.registerUser({name, email, password, role})
      res.status(201).json({ message: 'User registered successfully', newUser });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  },

  handleUserLogin: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const token = await AuthService.loginUser(email, password)
      const { accessToken, refreshToken } = token;

      res.status(200)
        .cookie('refreshToken', refreshToken, { httpOnly: true })
        .json({ message: 'User logged in successfully', accessToken });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  },

  handleUserUpdate: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, password } = req.body;
    try {
      const updatedUser = await AuthService.updateUser(id, {name, password})
      res.status(200).json({ message: 'User updated successfully', updatedUser });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  },

  handleLogout: async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      res.status(401).json({ message: "Unauthorized: Refresh token is missing" });
      return;
    }

    try {
      await AuthService.logoutUser(refreshToken)
      res.status(200)
        .clearCookie('refreshToken')
        .json({ message: 'User logged out successfully' });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }
};

export default AuthController;
