import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import RefreshTokenRepository from "../repositories/refreshToken.repository";

const AuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const accessToken = authHeader && authHeader.split(" ")[1]; // Bearer <token>
  
  const refreshToken = req.cookies.refreshToken;

  // console.log("refreshToken", refreshToken)
  // console.log("accessToken", accessToken)

  if (!accessToken && !refreshToken) {
    res.status(401).json({ message: "Unauthorized: Tokens are missing" });
    return;
  }

  try {
    // Check if access token is valid
    jwt.verify(accessToken as string, process.env.JWT_ACCESS_SECRET_KEY as string);
    next(); 
  } catch (error) {
    // If access token is invalid, check refresh token
    if (!refreshToken) {
      res.status(401).json({ message: "Unauthorized: Refresh token is missing" });
      return; 
    }

    try {
      // Verify refresh token
      jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY as string);

      // Check if refresh token is active
      const activeRefreshToken = await RefreshTokenRepository.findRefreshToken(refreshToken);
      // console.log(activeRefreshToken)
      
      if (!activeRefreshToken) {
        res.status(401).json({ message: "Unauthorized: Refresh token is invalid" });
        return;
      }

      // Create new access token
      const payload = jwt.decode(refreshToken) as { id: string; name: string; email: string; role: string };
      // console.log("Payload:", payload)

      const newAccessToken = jwt.sign( {
        id: payload.id,
        name: payload.name,
        email: payload.email,
        role: payload.role
      } , process.env.JWT_ACCESS_SECRET_KEY as string, { expiresIn: process.env.JWT_ACCESS_EXPIRATION });

      // console.log("New access token:", newAccessToken);

      // Send new access token in response
      res.status(200).json({ message: "Access token refreshed successfully", accessToken: newAccessToken });
      return;
    } catch (error) {
      res.status(401).json({ message: "Unauthorized: Refresh token is invalid" });  
      return; 
    }
  }
};

export default AuthMiddleware;