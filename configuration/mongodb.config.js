import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectMongoDB = async () => {
  if (process.env.NODE_ENV === "production") {
    const url = process.env.MONGODB_URL;
    try {
      await mongoose.connect(url);
      console.log(`connected to database:${url}`);
    } catch (error) {
      console.error(error.message);
    }
  } else {
    const url = process.env.MONGO_ATLAS;
    try {
      await mongoose.connect(url);
      console.log(`connected to mongodb `);
    } catch (error) {
      console.error(error.message);
    }
  }
};
