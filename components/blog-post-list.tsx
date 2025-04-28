"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDate } from "@/lib/utils"

interface BlogPost {
  _id: string
  title: string
  content: string
  author: {
    name: string
  }
  createdAt: string
}

export function BlogPostList({ limit = 10 }: { limit?: number }) {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(`/api/posts?limit=${limit}`)
        if (response.ok) {
          const data = await response.json()
          setPosts(data)
        }
      } catch (error) {
        console.error("Error fetching posts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [limit])

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: limit }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="pb-0">
              <Skeleton className="h-6 w-2/3" />
            </CardHeader>
            <CardContent className="py-4">
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-4 w-1/3" />
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  if (posts.length === 0) {
    return <p className="text-muted-foreground">No blog posts found.</p>
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Link href={`/blog/${post._id}`} key={post._id}>
          <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
            <CardHeader className="pb-0">
              <CardTitle className="line-clamp-2">{post.title}</CardTitle>
            </CardHeader>
            <CardContent className="py-4">
              <p className="line-clamp-3 text-muted-foreground">
                {post.content.substring(0, 150)}
                {post.content.length > 150 ? "..." : ""}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between text-sm text-muted-foreground">
              <span>By {post.author.name}</span>
              <span>{formatDate(post.createdAt)}</span>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}
