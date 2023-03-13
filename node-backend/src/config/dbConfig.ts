import mongoose from "mongoose";

const URI = 'mongodb://localhost:27017/blog_app'

export const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log('The connection with the database was successful');
  } catch (error) {
    console.error('ERROR: could not connect to the database');
    process.exit(1);
  }
};