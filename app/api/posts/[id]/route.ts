import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import Post from "@/lib/models/post"
import { authMiddleware, type AuthRequest } from "@/lib/middleware"
import mongoose from "mongoose"

// GET a single post by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect()

    const { id } = params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid post ID" }, { status: 400 })
    }

    const post = await Post.findById(id).populate("author", "name email")

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error("Error fetching post:", error)
    return NextResponse.json({ message: "Error fetching post" }, { status: 500 })
  }
}

// PUT update a post (protected - only post author or admin)
export async function PUT(req: AuthRequest, { params }: { params: { id: string } }) {
  try {
    const response = await authMiddleware(req)
    if (response.status !== 200) {
      return response
    }

    await dbConnect()

    const { id } = params
    const { title, content } = await req.json()

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid post ID" }, { status: 400 })
    }

    // Find the post
    const post = await Post.findById(id)

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 })
    }

    // Check if user is the author or an admin
    if (post.author.toString() !== req.user?._id && req.user?.role !== "admin") {
      return NextResponse.json({ message: "Not authorized to update this post" }, { status: 403 })
    }

    // Update the post
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, content },
      { new: true, runValidators: true },
    ).populate("author", "name email")

    return NextResponse.json(updatedPost)
  } catch (error) {
    console.error("Error updating post:", error)
    return NextResponse.json({ message: "Error updating post" }, { status: 500 })
  }
}

// DELETE a post (protected - only post author or admin)
export async function DELETE(req: AuthRequest, { params }: { params: { id: string } }) {
  try {
    const response = await authMiddleware(req)
    if (response.status !== 200) {
      return response
    }

    await dbConnect()

    const { id } = params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid post ID" }, { status: 400 })
    }

    // Find the post
    const post = await Post.findById(id)

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 })
    }

    // Check if user is the author or an admin
    if (post.author.toString() !== req.user?._id && req.user?.role !== "admin") {
      return NextResponse.json({ message: "Not authorized to delete this post" }, { status: 403 })
    }

    // Delete the post
    await Post.findByIdAndDelete(id)

    return NextResponse.json({ message: "Post deleted successfully" })
  } catch (error) {
    console.error("Error deleting post:", error)
    return NextResponse.json({ message: "Error deleting post" }, { status: 500 })
  }
}
