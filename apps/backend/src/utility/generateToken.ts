import jwt from "jsonwebtoken";
import { type Types } from "mongoose";

export const generateToken = async (payload: { id: Types.ObjectId }, res) => {
    const token = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 1000 // 1 hour
    }
    )
}

export const verifyToken = (token: string): { id: Types.ObjectId } | null => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        return decoded;
    } catch (error) {
        return null;
    }
}