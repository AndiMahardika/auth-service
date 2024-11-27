import { Schema, model } from "mongoose";
import { IUser } from "../types/user.entities";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

export const User = model<IUser>("User", userSchema);