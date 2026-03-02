import { createElement } from "react";
import Image from "next/image";
import { Info, AlertTriangle, Lightbulb } from "lucide-react";
import Chart from "./Chart";

/* ============= Callout Component ============= */
const calloutConfig = {
    info: { icon: Info, bg: "bg-accent-blue/10", border: "border-accent-blue/30", iconColor: "text-accent-blue" },
    warning: { icon: AlertTriangle, bg: "bg-amber-500/10", border: "border-amber-500/30", iconColor: "text-amber-500" },
    tip: { icon: Lightbulb, bg: "bg-accent/10", border: "border-accent/30", iconColor: "text-accent" },
};

function Callout({ type = "info", children }: { type?: "info" | "warning" | "tip"; children: React.ReactNode }) {
    const config = calloutConfig[type];
    const Icon = config.icon;
    return (
        <div className={`my-6 rounded-xl border ${config.border} ${config.bg} p-5`}>
            <div className="flex items-start gap-3">
                <Icon className={`h-5 w-5 mt-0.5 shrink-0 ${config.iconColor}`} />
                <div className="text-sm leading-relaxed">{children}</div>
            </div>
        </div>
    );
}

/* ============= ImageCaption Component ============= */
function ImageCaption({ src, caption, alt }: { src: string; caption?: string; alt?: string }) {
    return (
        <figure className="my-8">
            <div className="relative aspect-video rounded-xl overflow-hidden">
                <Image src={src} alt={alt || caption || ""} fill className="object-cover" sizes="(max-width: 768px) 100vw, 800px" />
            </div>
            {caption && <figcaption className="text-center text-sm text-muted-foreground mt-3 italic">{caption}</figcaption>}
        </figure>
    );
}

/* ============= Styled Headings ============= */
function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
    const sizes: Record<number, string> = {
        1: "text-3xl md:text-4xl font-bold mt-10 mb-4",
        2: "text-2xl md:text-3xl font-bold mt-8 mb-3",
        3: "text-xl md:text-2xl font-semibold mt-6 mb-2",
        4: "text-lg md:text-xl font-semibold mt-4 mb-2",
        5: "text-base font-semibold mt-4 mb-1",
        6: "text-sm font-semibold mt-3 mb-1",
    };
    const Comp = ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
        const id = typeof children === "string"
            ? children.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
            : undefined;
        return createElement(`h${level}`, { id, className: sizes[level], ...props }, children);
    };
    Comp.displayName = `H${level}`;
    return Comp;
}

/* ============= MDX Component Map ============= */
export const mdxComponents = {
    Chart,
    Callout,
    ImageCaption,
    h1: createHeading(1),
    h2: createHeading(2),
    h3: createHeading(3),
    h4: createHeading(4),
    h5: createHeading(5),
    h6: createHeading(6),
    p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => <p className="my-4 leading-relaxed" {...props}>{children}</p>,
    ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => <ul className="my-4 list-disc pl-6 space-y-1" {...props}>{children}</ul>,
    ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => <ol className="my-4 list-decimal pl-6 space-y-1" {...props}>{children}</ol>,
    li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => <li className="leading-relaxed" {...props}>{children}</li>,
    blockquote: ({ children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => <blockquote className="my-6 border-l-3 border-accent pl-4 italic text-muted-foreground" {...props}>{children}</blockquote>,
    a: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
        <a href={href} className="text-accent-blue underline underline-offset-3 hover:text-accent transition-colors"
            target={href?.startsWith("http") ? "_blank" : undefined}
            rel={href?.startsWith("http") ? "noopener noreferrer" : undefined} {...props}>{children}</a>
    ),
    table: ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => <div className="my-6 overflow-x-auto rounded-lg border border-border"><table className="w-full text-sm" {...props}>{children}</table></div>,
    th: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => <th className="bg-muted px-4 py-2.5 text-left font-semibold border-b border-border" {...props}>{children}</th>,
    td: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => <td className="px-4 py-2.5 border-b border-border" {...props}>{children}</td>,
    hr: () => <hr className="my-8 border-border" />,
    strong: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => <strong className="font-semibold text-foreground" {...props}>{children}</strong>,
    em: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => <em className="italic" {...props}>{children}</em>,
    pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => <pre className="my-6 overflow-x-auto rounded-xl bg-[#0d1117] p-5 text-sm leading-relaxed border border-border" {...props}>{children}</pre>,
    code: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => <code className="rounded-md bg-muted px-1.5 py-0.5 text-sm font-mono" {...props}>{children}</code>,
    img: ({ src, alt }: { src?: string; alt?: string }) =>
        src ? (
            <figure className="my-6">
                <Image src={src} alt={alt || ""} width={800} height={450} className="rounded-xl" sizes="(max-width: 768px) 100vw, 800px" />
            </figure>
        ) : null,
};
