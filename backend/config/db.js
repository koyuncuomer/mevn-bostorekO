import mongoose from "mongoose";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected!");
  } catch (error) {
    console.log("MongoDB fail!", error.message);
    throw error;
  }
};

export default connectDB;
