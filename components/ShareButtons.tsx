"use client";

import { useState } from "react";
import { Twitter, Linkedin, Link2, Check } from "lucide-react";

export default function ShareButtons({ title, slug }: { title: string; slug: string }) {
    const [copied, setCopied] = useState(false);
    const url = typeof window !== "undefined" ? window.location.href : `https://ai-tech-blog.vercel.app/blog/${slug}`;

    const shareTwitter = () => {
        window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
            "_blank"
        );
    };

    const shareLinkedIn = () => {
        window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
            "_blank"
        );
    };

    const copyLink = async () => {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground mr-1">Share:</span>
            <button
                onClick={shareTwitter}
                className="p-2 rounded-lg border border-border hover:border-accent/30 hover:text-accent transition-all"
                aria-label="Share on Twitter"
            >
                <Twitter className="h-4 w-4" />
            </button>
            <button
                onClick={shareLinkedIn}
                className="p-2 rounded-lg border border-border hover:border-accent-blue/30 hover:text-accent-blue transition-all"
                aria-label="Share on LinkedIn"
            >
                <Linkedin className="h-4 w-4" />
            </button>
            <button
                onClick={copyLink}
                className="p-2 rounded-lg border border-border hover:border-accent/30 hover:text-accent transition-all"
                aria-label="Copy link"
            >
                {copied ? <Check className="h-4 w-4 text-accent" /> : <Link2 className="h-4 w-4" />}
            </button>
        </div>
    );
}
