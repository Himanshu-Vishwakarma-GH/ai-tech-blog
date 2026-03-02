import { getAllPosts } from "@/lib/mdx";
import type { Metadata } from "next";
import BlogListingClient from "./BlogListingClient";

export const metadata: Metadata = {
    title: "Blog",
    description:
        "Explore articles on AI, Technology, Science, and Cyber Security. Updated daily.",
    openGraph: {
        title: "Blog | PulseBlog",
        description:
            "Explore articles on AI, Technology, Science, and Cyber Security. Updated daily.",
    },
};

export default function BlogPage() {
    const posts = getAllPosts();

    return <BlogListingClient posts={posts} />;
}
