import { Schema, model } from "mongoose";
import { IRefreshToken } from "../types/refreshToken";

const refreshTokenSchema = new Schema({
  userId: { type: String, required: true },
  refreshToken : { type: String, required: true },
  expiresAt: { type: Date, required: true }
});

export const RefreshToken = model<IRefreshToken>("RefreshToken", refreshTokenSchema);