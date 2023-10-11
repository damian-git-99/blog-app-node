import mongoose from 'mongoose'

export interface Post {
  id?: string
  user: mongoose.Types.ObjectId
  title: string
  summary: string
  content: string
  image: string | undefined
  time_to_read: number
  isPublish: boolean
  comments: mongoose.Types.ObjectId[]
  categories: string[]
  createdAt?: Date
  updatedAt?: Date
}

interface Comment {
  message: string
  createdAt: Date
  user: mongoose.Types.ObjectId
}

export const commentSchema = new mongoose.Schema<Comment>({
  message: String,
  createdAt: { type: Date, default: Date.now },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

const postSchema = new mongoose.Schema<Post>(
  {
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
    time_to_read: {
      type: Number,
      required: true
    },
    isPublish: {
      type: Boolean,
      default: false
    },
    comments: [commentSchema],
    categories: [{ type: String, maxlength: 20 }]
  },
  { timestamps: true }
)

// Ensure virtual fields are serialised.
postSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id
  }
})

postSchema.set('toObject', { virtuals: true })

export const PostModel = mongoose.model<Post>('Post', postSchema)
