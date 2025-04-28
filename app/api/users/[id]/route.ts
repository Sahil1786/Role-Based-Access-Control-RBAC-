import { NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import User from "@/lib/models/user"
import { authMiddleware, type AuthRequest, adminMiddleware } from "@/lib/middleware"
import mongoose from "mongoose"

// GET a single user by ID (admin only)
export async function GET(req: AuthRequest, { params }: { params: { id: string } }) {
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

    const { id } = params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid user ID" }, { status: 400 })
    }

    const user = await User.findById(id).select("-password")

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error("Error fetching user:", error)
    return NextResponse.json({ message: "Error fetching user" }, { status: 500 })
  }
}

// PATCH update a user role (admin only)
export async function PATCH(req: AuthRequest, { params }: { params: { id: string } }) {
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

    const { id } = params
    const { role } = await req.json()

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid user ID" }, { status: 400 })
    }

    // Validate role
    if (role !== "admin" && role !== "user") {
      return NextResponse.json({ message: "Invalid role. Role must be 'admin' or 'user'" }, { status: 400 })
    }

    const user = await User.findByIdAndUpdate(id, { role }, { new: true, runValidators: true }).select("-password")

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json({ message: "Error updating user" }, { status: 500 })
  }
}

// DELETE a user (admin only)
export async function DELETE(req: AuthRequest, { params }: { params: { id: string } }) {
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

    const { id } = params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid user ID" }, { status: 400 })
    }

    const user = await User.findByIdAndDelete(id)

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "User deleted successfully" })
  } catch (error) {
    console.error("Error deleting user:", error)
    return NextResponse.json({ message: "Error deleting user" }, { status: 500 })
  }
}
