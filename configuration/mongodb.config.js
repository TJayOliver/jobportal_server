import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectMongoDB = async () => {
    const url = process.env.MONGO_ATLAS;
    try {
      await mongoose.connect(url);
      console.log(`connected to mongodb`);
    } catch (error) {
      console.error(error.message);
    }
};
