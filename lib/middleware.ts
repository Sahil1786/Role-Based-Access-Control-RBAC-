import { type NextRequest, NextResponse } from "next/server"
import { verify } from "jsonwebtoken"
import { cookies } from "next/headers"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export interface AuthRequest extends NextRequest {
  user?: {
    _id: string
    role: string
  }
}

export async function authMiddleware(req: AuthRequest) {
  const cookieStore = cookies()
  const token = cookieStore.get("token")?.value

  if (!token) {
    return NextResponse.json({ message: "Authentication required" }, { status: 401 })
  }

  try {
    const decoded = verify(token, JWT_SECRET) as {
      _id: string
      role: string
    }

    req.user = decoded
    return NextResponse.next()
  } catch (error) {
    return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 })
  }
}

export function adminMiddleware(req: AuthRequest) {
  if (req.user?.role !== "admin") {
    return NextResponse.json({ message: "Admin access required" }, { status: 403 })
  }

  return NextResponse.next()
}
