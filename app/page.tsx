import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import BlogGrid from "@/components/BlogGrid";
import { ArrowRight, Newspaper, RefreshCw, Sparkles } from "lucide-react";

const categories = ["All", "AI", "Tech", "Science", "Cyber", "Space"];

export default function HomePage() {
  const posts = getAllPosts();
  const featuredPosts = posts.slice(0, 3);
  const totalPosts = posts.length;

  return (
    <>
      {/* ===== Hero Section ===== */}
      <section className="relative overflow-hidden">
        {/* Background grid effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,136,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,136,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px]" />

        <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-36 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-accent text-sm font-medium mb-8 animate-fade-in-up">
            <Sparkles className="h-4 w-4" />
            Decoding Tomorrow, Today
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up animate-delay-100">
            <span className="gradient-text animate-glow">AI. Tech. Science. Cyber.</span>
            <br />
            <span className="text-foreground">— Decoded Daily.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up animate-delay-200 leading-relaxed">
            Stay ahead with deep dives into artificial intelligence, cutting-edge technology,
            scientific breakthroughs, and cyber security trends.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animate-delay-300">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-black font-semibold text-sm hover:bg-accent/90 transition-all hover:shadow-[0_0_30px_rgba(0,255,136,0.3)]"
            >
              Explore Articles
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Stats Bar ===== */}
      <section className="border-y border-border bg-card/50">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Newspaper className="h-4 w-4 text-accent" />
              <span>
                <span className="text-foreground font-semibold">{totalPosts}</span> Posts
                Published
              </span>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4 text-accent-blue" />
              <span>Updated Daily</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent" />
              <span>100% Free</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Category Pills ===== */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-4">
        <div className="flex items-center gap-3 flex-wrap">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={cat === "All" ? "/blog" : `/blog?category=${cat}`}
              className="px-4 py-1.5 rounded-full text-sm border border-border hover:border-accent/40 hover:text-accent transition-all bg-card"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* ===== Featured Posts ===== */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Latest Articles</h2>
          <Link
            href="/blog"
            className="text-sm text-muted-foreground hover:text-accent transition-colors inline-flex items-center gap-1"
          >
            View All <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <BlogGrid posts={featuredPosts} />
      </section>

      {/* ===== Newsletter ===== */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="relative rounded-2xl border border-border p-8 md:p-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent-blue/5" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px]" />

          <div className="relative max-w-xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Stay in the <span className="gradient-text">Loop</span>
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Get the latest articles delivered to your inbox. No spam, just pure tech goodness.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-2.5 rounded-lg bg-muted border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:border-accent/50 transition-colors"
              />
              <button className="px-6 py-2.5 rounded-lg bg-accent text-black font-semibold text-sm hover:bg-accent/90 transition-all hover:shadow-[0_0_20px_rgba(0,255,136,0.2)] whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
