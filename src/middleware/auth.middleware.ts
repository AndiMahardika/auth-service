import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const AuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) {
    res.status(401).json({ message: "Unauthorized: Tokens are missing" });
    return;
  }

  try {
    // Check if access token is valid
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY as string);
    next(); 
  } catch (error) {
    res.status(401).json({ message: "Unauthorized: Invalid access token" });
  }
};

export default AuthMiddleware;