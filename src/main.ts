import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./utils/db.connect";
import AuthRouter from "./router/auth.routes";
import cookieParser from "cookie-parser"

dotenv.config();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();
const app = express();

app.use(express.json());
app.use(cors({
  origin: `http://localhost:${PORT}`,
  credentials: true
}));
app.use(cookieParser())

// Routes
app.use("/api/auth", AuthRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
