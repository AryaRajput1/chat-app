import express from "express";
import type { User } from "@repo/types";

const app = express();
const port = 3000;

app.get("/", (_req, res) => {
  const user: User = { id: "1", name: "Arya" };
  res.json(user);
});

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});