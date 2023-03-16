import mongoose from "mongoose";
import * as dotenv from 'dotenv'
dotenv.config()

const URI = process.env.MONGO_URI;

export const connectDB = async () => {
  try {
    await mongoose.connect(URI!);
    console.log('The connection with the database was successful');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};