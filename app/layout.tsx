import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@/styles/global.scss";
import Navbar from "@/component/Navbar";
import AppProviders from "./providers/AppProviders";
import ClientLayout from "./ClientLayout";
import { Toaster } from "sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ContentDekho | Blogs, Reels & Learn Together",
  description:
    "Discover, learn and create on ContentDekho — a community-driven platform for blogs, video reels, and creative stories. Share your ideas, explore new content, and grow together.",
  keywords: [
    "blog platform",
    "video reels",
    "blog",
    "next.js",
    "react",
    "mongodb",
    "mongoose",
    "Imagekit",
    "content creation",
    "creative community",
    "learning platform",
    "Next.js blog app",
    "Next.js video reels",
    "ImageKit hosting",
    "open blogging platform",
    "collaborative learning",
  ],
  authors: [{ name: "Mayur Pal", url: "https://contentbanao.vercel.app/" }],
  creator: "Mayur Pal",
  openGraph: {
    type: "website",
    url: "https://contentbanao.vercel.app/",
    title: "ContentDekho | Blogs, Reels & Learn Together",
    description:
      "Create, discover and learn with ContentDekho — where blogs, video reels, and ideas meet for everyone.",
    images: [
      {
        url: "https://ik.imagekit.io/thissidemayur/ogopengraph_LgzDvH4XMP.jpg",
        width: 1200,
        height: 630,
        alt: "ContentDekho - Blogs & Reels Community",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@thissidemayur",
    creator: "@thissidemayur",
    title: "ContentDekho | Blogs, Reels & Learn Together",
    description:
      "Create, share and explore blogs and video reels with ContentDekho — a platform for creators and learners alike.",
    images: ["https://ik.imagekit.io/thissidemayur/ogopengraph_LgzDvH4XMP.jpg"],
  },
  other: {
    "instagram:site": "@thissidemayur",
    "linkedin:site": "https://www.linkedin.com/in/thissidemayur",
    "github:site": "https://github.com/thissidemayur",
  },
  metadataBase: new URL("https://contentbanao.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Wrap children in StoreProvider */}
        <Toaster richColors position="top-center" />

        <AppProviders>
          <ClientLayout>
            <Navbar />
            {children}
            <SpeedInsights />
          </ClientLayout>
        </AppProviders>
      </body>
    </html>
  );
}
