import mongoose from "mongoose"

export interface IPost extends mongoose.Document {
  title: string
  content: string
  author: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const PostSchema = new mongoose.Schema<IPost>(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    content: {
      type: String,
      required: [true, "Please provide content"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide an author"],
    },
  },
  {
    timestamps: true,
  },
)

// Prevent mongoose from creating a new model if it already exists
const Post = mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema)

export default Post
