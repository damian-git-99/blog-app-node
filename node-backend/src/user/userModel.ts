import mongoose, { Types, Schema } from 'mongoose'

export interface User {
  username: string
  email: string
  password: string
  favorites?: Types.ObjectId[]
}

const userSchema = new mongoose.Schema<User>({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  favorites: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    default: []
  }
})

export const UserModel = mongoose.model<User>('User', userSchema)
