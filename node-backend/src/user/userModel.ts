import mongoose from "mongoose";

export interface User {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<User>({
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