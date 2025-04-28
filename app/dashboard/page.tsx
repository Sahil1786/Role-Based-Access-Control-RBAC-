"use client"

import { useAuth } from "@/lib/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link href="/dashboard/posts/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Post
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Welcome, {user?.name}</CardTitle>
            <CardDescription>You are logged in as {user?.role}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {user?.role === "admin"
                ? "You have full access to all features of the platform."
                : "You can create and manage your own blog posts."}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your content</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/dashboard/posts">
              <Button variant="outline" className="w-full justify-start">
                View My Posts
              </Button>
            </Link>
            <Link href="/dashboard/posts/new">
              <Button variant="outline" className="w-full justify-start">
                Create New Post
              </Button>
            </Link>
            {user?.role === "admin" && (
              <Link href="/dashboard/users">
                <Button variant="outline" className="w-full justify-start">
                  Manage Users
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
