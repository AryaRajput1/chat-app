import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateToken } from "../utility/generateToken";
import { profile } from "console";


export const signup = async (req, res, next) => {
    try {
        const { email, password, name } = req.body;
        // Validate input
        if (!email || !password || !name) {
            return res.status(400).json({ message: "Email, password and name are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: encryptedPassword
        })

        if (!newUser) {
            return res.status(500).json({ message: "Error creating user" });
        }

        generateToken({ id: newUser._id }, res);
        await newUser.save();

        res.status(201).json({
            message: "User created successfully", success: true, user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                profilePic: newUser.avatar
            }
        });
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Generate JWT token
        generateToken({ id: user._id }, res);

        res.status(200).json({
            message: "Login successful", success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                profilePic: user.avatar
            }
        });
    } catch (error) {
        next(error);
    }
}

export const logout = (req, res, next) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        next(error)
    }
};

export const updateProfile = async (req, res, next) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;

        if (!profilePic) {
            return res.status(400).json({ message: "Profile pic is required" });
        }

        // const uploadResponse = await cloudinary.uploader.upload(profilePic);
        // const updatedUser = await User.findByIdAndUpdate(
        //   userId,
        //   { profilePic: uploadResponse.secure_url },
        //   { new: true }
        // );

        res.status(200).json({
            message: "Profile updated successfully", success: true, user: {
                id: req.user._id
            }
        });
    } catch (error) {
        console.log("error in update profile:", error);
        next(error)
    }
};

export const checkAuth = (req, res, next) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        next(error)
    }
};