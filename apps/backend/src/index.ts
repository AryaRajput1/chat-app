import express from "express";
import authRoute from "./routes/auth.route";
import messageRoute from "./routes/message.route";
import 'dotenv/config';
import { connectToDB } from "./config/db";
import cors from 'cors'
import CookieParser from 'cookie-parser'

const PORT = process.env.PORT || 8081;

const app = express();

app.use(cors({
  origin: process.env.UI_URL,
  credentials: true
}))

app.use(CookieParser)

app.use(express.json());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/message", messageRoute);

app.use((err, _req, res, _next) => {
  
  console.log('Error Route')
  console.error(err.stack); // Log the error stack for debugging
  res.status(500).json({
    success: false,
    message: 'Something went wrong. Please try again later.'
  }); // Send a generic error response to the client
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
  connectToDB()
});