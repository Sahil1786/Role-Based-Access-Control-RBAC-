import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import Post from "@/lib/models/post"
import { authMiddleware, type AuthRequest } from "@/lib/middleware"

// GET all posts
export async function GET(req: NextRequest) {
  try {
    await dbConnect()

    const url = new URL(req.url)
    const limit = Number.parseInt(url.searchParams.get("limit") || "10")

    const posts = await Post.find().sort({ createdAt: -1 }).limit(limit).populate("author", "name").lean()

    return NextResponse.json(posts)
  } catch (error) {
    console.error("Error fetching posts:", error)
    return NextResponse.json({ message: "Error fetching posts" }, { status: 500 })
  }
}

// POST a new post (protected - only authenticated users)
export async function POST(req: AuthRequest) {
  try {
    const response = await authMiddleware(req)
    if (response.status !== 200) {
      return response
    }

    await dbConnect()

    const { title, content } = await req.json()

    const post = await Post.create({
      title,
      content,
      author: req.user?._id,
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error("Error creating post:", error)
    return NextResponse.json({ message: "Error creating post" }, { status: 500 })
  }
}
