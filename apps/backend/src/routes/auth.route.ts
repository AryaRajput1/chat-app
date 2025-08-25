import { Router } from "express";
import { checkAuth, login, logout, signup, updateProfile } from "../controllers/auth.controller";
import { protectRoute } from "../middlewares/auth.middleware";

const router = Router()

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", protectRoute, logout);
router.post("/update-profile", protectRoute, updateProfile);
router.get("/check", (req, res) => {
    console.log('Arya')
    res.status(200).json({})
})
export default router;