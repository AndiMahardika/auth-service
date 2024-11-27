import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./utils/db.connect";

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

// Routes
app.get("/", (req, res) => {
  res.status(200).send({
    message: "Welcome to the API",
    status: 200,
    data: [
      {
        name: "John Doe",
        age: 30,
      },
      {
        name: "Jane Doe",
        age: 25,
      },
    ],
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
