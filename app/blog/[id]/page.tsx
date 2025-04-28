"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDate } from "@/lib/utils"
import { ArrowLeft } from "lucide-react"

interface Post {
  _id: string
  title: string
  content: string
  author: {
    name: string
  }
  createdAt: string
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`/api/posts/${params.id}`)
        if (response.ok) {
          const data = await response.json()
          setPost(data)
        } else {
          const errorData = await response.json()
          setError(errorData.message || "Failed to load post")
        }
      } catch (error) {
        console.error("Error fetching post:", error)
        setError("An error occurred while fetching the post")
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b">
          <div className="container flex h-16 items-center">
            <Link href="/" className="text-xl font-bold">
              RBAC Blog
            </Link>
          </div>
        </header>
        <main className="container py-10">
          <div className="mx-auto max-w-3xl space-y-8">
            <Link href="/blog">
              <Button variant="ghost" className="mb-6 pl-0 hover:bg-transparent">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
            <Skeleton className="h-12 w-3/4" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b">
          <div className="container flex h-16 items-center">
            <Link href="/" className="text-xl font-bold">
              RBAC Blog
            </Link>
          </div>
        </header>
        <main className="container py-10">
          <div className="mx-auto max-w-3xl">
            <Link href="/blog">
              <Button variant="ghost" className="mb-6 pl-0 hover:bg-transparent">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-8 text-center">
              <h2 className="text-xl font-semibold text-destructive">Error</h2>
              <p className="mt-2 text-muted-foreground">{error || "Post not found"}</p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6 font-medium">
            <Link href="/" className="text-xl font-bold">
              RBAC Blog
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/" className="transition-colors hover:text-foreground/80">
                Home
              </Link>
              <Link href="/blog" className="transition-colors hover:text-foreground/80">
                Blog
              </Link>
              <Link href="/about" className="transition-colors hover:text-foreground/80">
                About
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="container py-10">
        <article className="mx-auto max-w-3xl">
          <Link href="/blog">
            <Button variant="ghost" className="mb-6 pl-0 hover:bg-transparent">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
          <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>
          <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
            <span>By {post.author.name}</span>
            <span>•</span>
            <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
          </div>
          <div className="prose prose-gray mt-8 max-w-none dark:prose-invert">
            {post.content.split("\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </article>
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} RBAC Blog Platform. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
