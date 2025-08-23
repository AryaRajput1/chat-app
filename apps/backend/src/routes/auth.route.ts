import { Router } from "express";
import { signup } from "../controllers/auth.controller";

const router = Router()

router.post("/login", (req, res) => {
  // Handle login logic here
    res.send("Login endpoint");
});

router.post("/signup", signup);

router.post("/logout", (req, res) => {
  // Handle logout logic here
    res.send("Logout endpoint");
});

export default router;