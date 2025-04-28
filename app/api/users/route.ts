import { NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import User from "@/lib/models/user"
import { authMiddleware, type AuthRequest, adminMiddleware } from "@/lib/middleware"

// GET all users (admin only)
export async function GET(req: AuthRequest) {
  try {
    // Check if user is authenticated
    const authResponse = await authMiddleware(req)
    if (authResponse.status !== 200) {
      return authResponse
    }

    // Check if user is admin
    const adminResponse = await adminMiddleware(req)
    if (adminResponse.status !== 200) {
      return adminResponse
    }

    await dbConnect()

    // Get all users
    const users = await User.find().select("-password").sort({ createdAt: -1 }).lean()

    return NextResponse.json(users)
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ message: "Error fetching users" }, { status: 500 })
  }
}
