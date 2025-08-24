import { Router } from "express";
import { login, logout, signup, updateProfile } from "../controllers/auth.controller";
import { protectRoute } from "../middlewares/auth.middleware";

const router = Router()

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", protectRoute, logout);
router.post("/update-profile", protectRoute, updateProfile);
export default router;