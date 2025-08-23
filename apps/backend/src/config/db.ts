import mongoose from "mongoose";

export const connectToDB = async () => {
    try {
        const URL = process.env.MONGO_URI as string;
        await mongoose.connect(URL);
        
        console.log("Connected to the database");
    } catch (error) {
        console.error("Error connecting to the database", error);
        process.exit(1);
    }
}