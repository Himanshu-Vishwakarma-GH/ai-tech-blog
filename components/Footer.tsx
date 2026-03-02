import Link from "next/link";
import { Zap, Github, Twitter, Rss } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t border-border bg-card/50">
            <div className="mx-auto max-w-6xl px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <Zap className="h-5 w-5 text-accent" />
                            <span className="text-lg font-bold">
                                <span className="gradient-text">Pulse</span>
                                <span>Blog</span>
                            </span>
                        </Link>
                        <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
                            Decoding the latest in AI, Technology, Science, and Cyber Security.
                            Updated daily with fresh insights and analysis.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-semibold text-sm mb-4">Navigation</h4>
                        <div className="flex flex-col gap-2">
                            {[
                                { href: "/", label: "Home" },
                                { href: "/blog", label: "Blog" },
                                { href: "/about", label: "About" },
                            ].map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="font-semibold text-sm mb-4">Categories</h4>
                        <div className="flex flex-col gap-2">
                            {["AI", "Tech", "Science", "Cyber", "Space"].map((cat) => (
                                <Link
                                    key={cat}
                                    href={`/blog?category=${cat}`}
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {cat}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-muted-foreground">
                        © {new Date().getFullYear()} PulseBlog. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="GitHub"
                        >
                            <Github className="h-4 w-4" />
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Twitter"
                        >
                            <Twitter className="h-4 w-4" />
                        </a>
                        <a
                            href="/sitemap.xml"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="RSS Feed"
                        >
                            <Rss className="h-4 w-4" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
