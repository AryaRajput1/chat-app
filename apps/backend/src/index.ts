import express from "express";
import authRoute from "./routes/auth.route";
import 'dotenv/config';
import { connectToDB } from "./config/db";

const PORT = process.env.PORT || 8081;

const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRoute);

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
  connectToDB()
});