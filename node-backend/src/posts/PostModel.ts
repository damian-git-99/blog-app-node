import mongoose from "mongoose";

export interface Post {
  user: mongoose.Types.ObjectId;
  title: string;
  summary: string;
  content: string;
  image: string | undefined;
  category: string;
  time_to_read: number;
  isPublish: boolean;
}

const postSchema = new mongoose.Schema<Post>({
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true
  },
  title: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  category: {
    type: String,
    required: true
  },
  time_to_read: {
    type: Number,
    required: true
  },
  isPublish: {
    type: Boolean,
    default: false
  }
});

export const PostModel = mongoose.model<Post>('Post', postSchema);