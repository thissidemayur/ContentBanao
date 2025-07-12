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
  title: "Blog + Reel website",
  description: "I have created a blog + reel website",
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
