import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://ai-tech-blog.vercel.app"
  ),
  title: {
    default: "PulseBlog — AI. Tech. Science. Cyber. Decoded Daily.",
    template: "%s | PulseBlog",
  },
  description:
    "Decoding the latest in AI, Technology, Science, and Cyber Security. Updated daily with fresh insights and analysis.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "PulseBlog",
    title: "PulseBlog — AI. Tech. Science. Cyber. Decoded Daily.",
    description:
      "Decoding the latest in AI, Technology, Science, and Cyber Security. Updated daily with fresh insights and analysis.",
  },
  twitter: {
    card: "summary_large_image",
    title: "PulseBlog — AI. Tech. Science. Cyber. Decoded Daily.",
    description:
      "Decoding the latest in AI, Technology, Science, and Cyber Security.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider>
          <Navbar />
          <main className="flex-1 pt-20">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
