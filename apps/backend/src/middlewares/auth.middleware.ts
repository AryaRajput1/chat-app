import { verifyToken } from "../utility/generateToken";
import { User } from "../models/user.model";

export const protectRoute = async (req, res, next) => {
    try {

        console.log('Protected Route')
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No Token Provided" });
        }
        console.log('protectRoute')

        console.log(token)

        const decoded = verifyToken(token);

        console.log(decoded)

        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid Token" });
        }

        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user;

        next();
    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
        next(error);
    }
};