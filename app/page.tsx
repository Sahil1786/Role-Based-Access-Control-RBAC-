import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BlogPostList } from "@/components/blog-post-list"

export default function Home() {
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
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="flex max-w-[980px] flex-col items-start gap-2">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl lg:text-5xl">
              Welcome to RBAC Blog Platform
            </h1>
            <p className="max-w-[700px] text-lg text-muted-foreground">
              A secure blog platform with role-based access control. Different roles have different permissions.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/blog">
              <Button size="lg">Read Blog Posts</Button>
            </Link>
            <Link href="/signup">
              <Button size="lg" variant="outline">
                Create an Account
              </Button>
            </Link>
          </div>
        </section>
        <section className="py-12">
          <h2 className="text-2xl font-bold mb-6">Latest Posts</h2>
          <BlogPostList limit={3} />
        </section>
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
