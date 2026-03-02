import BlogCard from "./BlogCard";
import type { BlogPost, BlogPostMeta } from "@/types/blog";

type GridPost = BlogPost | BlogPostMeta;

export default function BlogGrid({ posts }: { posts: GridPost[] }) {
    if (posts.length === 0) {
        return (
            <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">No posts found.</p>
                <p className="text-sm text-muted-foreground mt-2">
                    Try adjusting your search or filters.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
                <div
                    key={post.slug}
                    className="animate-fade-in-up opacity-0"
                    style={{ animationDelay: `${i * 100}ms`, animationFillMode: "forwards" }}
                >
                    <BlogCard post={post} />
                </div>
            ))}
        </div>
    );
}
