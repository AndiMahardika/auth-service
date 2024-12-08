import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const AuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const  { accessToken } = req.cookies;
  console.log("Access Token:", accessToken);
  // console.log("Refresh Token:", refreshToken);

  if (!accessToken) {
    res.status(401).json({ message: "Unauthorized: Tokens are missing" });
    return;
  }

  try {
    // Check if access token is valid
    jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET_KEY as string);
    next(); 
  } catch (error) {
    res.status(401).json({ message: "Unauthorized: Invalid access token" });
  }
};

export default AuthMiddleware;