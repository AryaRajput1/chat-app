import { match } from "assert";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    name: {
        type: String,
        required: true,
        minLength: 4,
    },
    avatar: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
})

export const User = mongoose.model("User", userSchema);