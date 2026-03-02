import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowUpRight } from "lucide-react";
import type { BlogPost, BlogPostMeta } from "@/types/blog";

type CardPost = BlogPost | BlogPostMeta;

export default function BlogCard({ post }: { post: CardPost }) {
    return (
        <Link href={`/blog/${post.slug}`} className="group block">
            <article className="rounded-xl border border-border bg-card overflow-hidden transition-all duration-300 hover:border-accent/40 hover:shadow-[0_0_30px_rgba(0,255,136,0.06)] hover:-translate-y-1">
                {/* Cover Image */}
                {post.coverImage && (
                    <div className="relative aspect-[16/9] overflow-hidden">
                        <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <span className="absolute top-3 left-3 text-xs font-medium px-2.5 py-1 rounded-full bg-accent/20 text-accent border border-accent/30 backdrop-blur-sm">
                            {post.category}
                        </span>
                    </div>
                )}

                {/* Content */}
                <div className="p-5">
                    <h3 className="font-semibold text-lg leading-snug mb-2 group-hover:text-accent transition-colors line-clamp-2">
                        {post.title}
                        <ArrowUpRight className="inline-block ml-1 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                        {post.description}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {new Date(post.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {post.readTime}
                        </span>
                    </div>

                    {/* Tags */}
                    {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                            {post.tags.slice(0, 3).map((tag) => (
                                <span
                                    key={tag}
                                    className="text-[11px] px-2 py-0.5 rounded-md bg-muted text-muted-foreground"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </article>
        </Link>
    );
}
