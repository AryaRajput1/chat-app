import { Message } from "../models/message.model";
import { User } from "../models/user.model";
import { uploadToCloudinary } from "../utility/uploadToCloudinary";

export const getUsersForSidebar = async (req, res, next) => {
    try {
        const currentUserId = req.user._id;
        const users = await User.find({ _id: { $ne: currentUserId } }).select('-password');
        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            users
        });
    } catch (error) {
        next(error);
    }
};

export const getMessages = async (req, res, next) => {
    try {
        const currentUserId = req.user._id;
        const otherUserId = req.params.id;

        const messages = await Message.find({
            $or: [
                { sender: currentUserId, receiver: otherUserId },
                { sender: otherUserId, receiver: currentUserId }
            ]
        }).sort({ createdAt: 1 });

        res.status(200).json({
            success: true,
            messages,
            message: "Messages fetched successfully"
        });
    } catch (error) {
        next(error);
    }
};

export const sendMessage = async (req, res, next) => {
    try {
        const senderId = req.user._id;
        const receiverId = req.params.id;
        const { content, image } = req.body;

        let imageUrl;
        if (image) {
            // Upload base64 image to cloudinary
            imageUrl = await uploadToCloudinary(image);
        }

        const newMessage = new Message({
            sender: senderId,
            receiver: receiverId,
            content,
            image: imageUrl
        });

        await newMessage.save();
        res.status(201).json({
            success: true,
            message: "Message sent successfully",
            newMessage
        });
    } catch (error) {
        next(error);
    }
};