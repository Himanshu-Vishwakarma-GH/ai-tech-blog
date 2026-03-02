"use client";

import { MDXRemote } from "next-mdx-remote";
import { mdxComponents } from "@/components/MDXComponents";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";

interface Props {
    mdxSource: MDXRemoteSerializeResult;
}

export default function MDXContent({ mdxSource }: Props) {
    return <MDXRemote {...mdxSource} components={mdxComponents} />;
}
