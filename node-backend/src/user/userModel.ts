import mongoose from "mongoose";

export interface User {
  username: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<User>({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

export const UserModel = mongoose.model<User>('User', userSchema);