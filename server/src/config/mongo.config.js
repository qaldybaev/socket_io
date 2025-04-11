import { config } from "dotenv";
import mongoose from "mongoose";

config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Mongo'db ga ulandi✅");
  } catch (error) {
    console.log("Mongo'db ga ulashda xatolik❌");
    console.log(error);
  }
};
