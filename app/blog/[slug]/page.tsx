import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";

import { getPostBySlug, getRelatedPosts, extractHeadings, getPostSlugs } from "@/lib/mdx";
import { mdxComponents } from "@/components/MDXComponents";
import ShareButtons from "@/components/ShareButtons";
import TableOfContents from "@/components/TableOfContents";
import BlogCard from "@/components/BlogCard";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const slugs = getPostSlugs();
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    try {
        const post = getPostBySlug(slug);
        return {
            title: post.title,
            description: post.description,
            openGraph: {
                type: "article",
                title: post.title,
                description: post.description,
                images: post.coverImage ? [{ url: post.coverImage }] : [],
                publishedTime: post.date,
                authors: [post.author],
                tags: post.tags,
            },
            twitter: {
                card: "summary_large_image",
                title: post.title,
                description: post.description,
                images: post.coverImage ? [post.coverImage] : [],
            },
        };
    } catch {
        return { title: "Post Not Found" };
    }
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;

    let post;
    try {
        post = getPostBySlug(slug);
    } catch {
        notFound();
    }

    const headings = extractHeadings(post.content);
    const relatedPosts = getRelatedPosts(post, 3);

    return (
        <article className="mx-auto max-w-6xl px-6 py-8 md:py-12">
            <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors mb-8"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
            </Link>

            {post.coverImage && (
                <div className="relative aspect-[21/9] rounded-2xl overflow-hidden mb-8">
                    <Image src={post.coverImage} alt={post.title} fill className="object-cover" sizes="(max-width: 1200px) 100vw, 1200px" priority />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>
            )}

            <header className="max-w-3xl mb-8">
                <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20 mb-4">
                    {post.category}
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 leading-tight">
                    {post.title}
                </h1>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{post.description}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1.5"><User className="h-4 w-4" />{post.author}</span>
                    <span className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </span>
                    <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{post.readTime}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2.5 py-1 rounded-md bg-muted text-muted-foreground">{tag}</span>
                    ))}
                </div>
                <ShareButtons title={post.title} slug={post.slug} />
            </header>

            <div className="border-t border-border my-8" />

            <div className="flex gap-10">
                <div className="flex-1 min-w-0 prose max-w-3xl">
                    <MDXRemote
                        source={post.content}
                        components={mdxComponents}
                        options={{
                            mdxOptions: {
                                rehypePlugins: [[rehypePrettyCode, { theme: "github-dark-dimmed", keepBackground: true }]],
                            },
                        }}
                    />
                </div>
                {headings.length > 0 && (
                    <aside className="hidden lg:block w-64 shrink-0">
                        <div className="sticky top-24">
                            <TableOfContents headings={headings} />
                        </div>
                    </aside>
                )}
            </div>

            <div className="border-t border-border mt-12 pt-8">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <p className="text-sm text-muted-foreground">Enjoyed this article? Share it with others.</p>
                    <ShareButtons title={post.title} slug={post.slug} />
                </div>
            </div>

            {relatedPosts.length > 0 && (
                <section className="mt-16">
                    <h2 className="text-2xl font-bold mb-8">Related <span className="gradient-text">Articles</span></h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {relatedPosts.map((rp) => <BlogCard key={rp.slug} post={rp} />)}
                    </div>
                </section>
            )}
        </article>
    );
}
