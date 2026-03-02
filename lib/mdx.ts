import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogPost, BlogPostMeta } from "@/types/blog";

const postsDirectory = path.join(process.cwd(), "content/posts");

export function getPostSlugs(): string[] {
    if (!fs.existsSync(postsDirectory)) return [];
    return fs
        .readdirSync(postsDirectory)
        .filter((file) => file.endsWith(".mdx"))
        .map((file) => file.replace(/\.mdx$/, ""));
}

export function getPostBySlug(slug: string): BlogPost {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
        title: data.title || "",
        date: data.date || "",
        slug: data.slug || slug,
        description: data.description || "",
        tags: data.tags || [],
        category: data.category || "",
        coverImage: data.coverImage || "",
        author: data.author || "AutoBot",
        readTime: data.readTime || "5 min read",
        content,
    };
}

export function getAllPosts(): BlogPost[] {
    const slugs = getPostSlugs();
    return slugs
        .map((slug) => getPostBySlug(slug))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostsByCategory(category: string): BlogPost[] {
    return getAllPosts().filter(
        (post) => post.category.toLowerCase() === category.toLowerCase()
    );
}

export function getRelatedPosts(currentPost: BlogPost, limit = 3): BlogPostMeta[] {
    const allPosts = getAllPosts();
    return allPosts
        .filter((post) => post.slug !== currentPost.slug)
        .filter(
            (post) =>
                post.category === currentPost.category ||
                post.tags.some((tag) => currentPost.tags.includes(tag))
        )
        .slice(0, limit)
        .map(({ content: _, ...meta }) => meta);
}

export function getAllCategories(): string[] {
    const posts = getAllPosts();
    const categories = new Set(posts.map((p) => p.category));
    return Array.from(categories);
}

export function getAllTags(): string[] {
    const posts = getAllPosts();
    const tags = new Set(posts.flatMap((p) => p.tags));
    return Array.from(tags);
}

export function extractHeadings(content: string): { id: string; text: string; level: number }[] {
    const headingRegex = /^(#{2,4})\s+(.+)$/gm;
    const headings: { id: string; text: string; level: number }[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
        const level = match[1].length;
        const text = match[2].trim();
        const id = text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
        headings.push({ id, text, level });
    }

    return headings;
}
