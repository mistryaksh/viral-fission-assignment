import mongoose from "mongoose";
import { config } from "./env.config";

export const connectDb = async () => {
  try {
    await mongoose.connect(config.MONGO_DB);
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error;
  }
};
