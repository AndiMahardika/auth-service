import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IUser } from "../types/user.entities";

const AdminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const accessToken = authHeader && authHeader.split(" ")[1]; // Bearer <token>
  
  const refreshToken = req.cookies.refreshToken;

  // ACCESS TOKEN AND REFRESH TOKEN CHECK
  if (!accessToken && !refreshToken) {
    res.status(401).json({ message: "Unauthorized: Access token is missing" });
    return;
  }

  try {
    // VERIFY ACCESS TOKEN
    const payload = jwt.verify(accessToken as string, process.env.JWT_ACCESS_SECRET_KEY as string) as IUser;

    // CHECK IF USER IS ADMIN
    if (payload.role !== "admin") {
      res.status(403).json({ message: "Access denied. Only admin users are allowed." });
      return
    }

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
  }
};

export default AdminMiddleware;