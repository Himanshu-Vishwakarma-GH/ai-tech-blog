"use client";

import { useState, useMemo } from "react";
import BlogGrid from "@/components/BlogGrid";
import { Search } from "lucide-react";
import type { BlogPost } from "@/types/blog";

const categories = ["All", "AI", "Tech", "Science", "Cyber", "Space"];

interface Props {
    posts: BlogPost[];
}

export default function BlogListingClient({ posts }: Props) {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredPosts = useMemo(() => {
        let filtered = posts;

        if (activeCategory !== "All") {
            filtered = filtered.filter(
                (p) => p.category.toLowerCase() === activeCategory.toLowerCase()
            );
        }

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (p) =>
                    p.title.toLowerCase().includes(q) ||
                    p.description.toLowerCase().includes(q) ||
                    p.tags.some((t) => t.toLowerCase().includes(q))
            );
        }

        return filtered;
    }, [posts, searchQuery, activeCategory]);

    return (
        <div className="mx-auto max-w-6xl px-6 py-12">
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-3xl md:text-4xl font-bold mb-3">
                    All <span className="gradient-text">Articles</span>
                </h1>
                <p className="text-muted-foreground">
                    Explore the latest in AI, Tech, Science, and Cyber Security.
                </p>
            </div>

            {/* Search & Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-10">
                {/* Search Bar */}
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search articles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-card border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:border-accent/50 transition-colors"
                    />
                </div>

                {/* Category Tabs */}
                <div className="flex items-center gap-2 flex-wrap">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-1.5 rounded-full text-sm border transition-all ${activeCategory === cat
                                    ? "border-accent bg-accent/10 text-accent"
                                    : "border-border hover:border-accent/30 text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Results count */}
            <p className="text-sm text-muted-foreground mb-6">
                Showing {filteredPosts.length} article{filteredPosts.length !== 1 ? "s" : ""}
            </p>

            {/* Grid */}
            <BlogGrid posts={filteredPosts} />
        </div>
    );
}
