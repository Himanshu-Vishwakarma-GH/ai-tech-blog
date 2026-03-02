"use client";

import { useState, useEffect } from "react";
import { List } from "lucide-react";

interface Heading {
    id: string;
    text: string;
    level: number;
}

export default function TableOfContents({ headings }: { headings: Heading[] }) {
    const [activeId, setActiveId] = useState("");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "-80px 0px -60% 0px" }
        );

        headings.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [headings]);

    if (headings.length === 0) return null;

    return (
        <nav className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <List className="h-4 w-4 text-accent" />
                Table of Contents
            </h3>
            <ul className="space-y-1.5 text-sm">
                {headings.map((heading) => (
                    <li
                        key={heading.id}
                        style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}
                    >
                        <a
                            href={`#${heading.id}`}
                            className={`block py-0.5 transition-colors hover:text-accent ${activeId === heading.id
                                    ? "text-accent font-medium"
                                    : "text-muted-foreground"
                                }`}
                        >
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
