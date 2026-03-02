import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About",
    description:
        "Learn about PulseBlog — an AI-powered tech blog auto-updated daily with the latest in AI, Tech, Science, and Cyber.",
    openGraph: {
        title: "About | PulseBlog",
        description:
            "Learn about PulseBlog — an AI-powered tech blog auto-updated daily.",
    },
};

export default function AboutPage() {
    return (
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
            {/* Header */}
            <div className="mb-12 text-center">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                    About <span className="gradient-text">PulseBlog</span>
                </h1>
                <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
            </div>

            {/* Content */}
            <div className="prose max-w-none space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                    This blog is <strong className="text-foreground">AI-powered</strong> and
                    auto-updated daily with the latest in{" "}
                    <span className="text-accent font-medium">AI</span>,{" "}
                    <span className="text-accent-blue font-medium">Tech</span>,{" "}
                    <span className="text-accent font-medium">Science</span>, and{" "}
                    <span className="text-accent-blue font-medium">Cyber Security</span>.
                </p>

                <div className="rounded-xl border border-border bg-card p-8 my-8">
                    <h2 className="text-xl font-semibold mb-4">Our Mission</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        We believe that staying informed about technology shouldn&apos;t be complicated.
                        PulseBlog distills complex topics into clear, engaging articles that anyone
                        can understand — from seasoned engineers to curious newcomers.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                    {[
                        {
                            emoji: "🤖",
                            title: "AI-Powered",
                            desc: "Content generated and curated using cutting-edge AI systems.",
                        },
                        {
                            emoji: "⚡",
                            title: "Daily Updates",
                            desc: "Fresh articles every day covering the latest developments.",
                        },
                        {
                            emoji: "🔓",
                            title: "100% Free",
                            desc: "No paywalls, no subscriptions. Knowledge should be accessible.",
                        },
                    ].map((item) => (
                        <div
                            key={item.title}
                            className="rounded-xl border border-border bg-card p-6 text-center hover:border-accent/30 transition-colors"
                        >
                            <div className="text-3xl mb-3">{item.emoji}</div>
                            <h3 className="font-semibold mb-2">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="rounded-xl border border-accent/20 bg-accent/5 p-8 my-8">
                    <h2 className="text-xl font-semibold mb-4">Categories We Cover</h2>
                    <div className="flex flex-wrap gap-3">
                        {["Artificial Intelligence", "Technology", "Science", "Cyber Security", "Space"].map(
                            (cat) => (
                                <span
                                    key={cat}
                                    className="px-4 py-2 rounded-lg border border-border bg-card text-sm font-medium"
                                >
                                    {cat}
                                </span>
                            )
                        )}
                    </div>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                    Built with <span className="text-accent">Next.js</span>,{" "}
                    <span className="text-accent-blue">TypeScript</span>, and{" "}
                    <span className="text-accent">MDX</span>. Deployed on Vercel. Open source and
                    community-driven.
                </p>
            </div>
        </div>
    );
}
