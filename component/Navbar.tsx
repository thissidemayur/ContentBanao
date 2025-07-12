"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Home, FileText, Video, PlusSquare } from "lucide-react";
import AccountDropdown from "@/component/user/Accountdropdown";

export default function MainNavbar() {
  const { data: session } = useSession();

  // Authenticated nav links
  const authLinks = [
    { label: "Home", path: "/" },
    { label: "Blogs", path: "/blog" },
    { label: "Reels", path: "/reels" },
    { label: "Add Blog", path: "/create-blog" },
    { label: "Add Reel", path: "/add-reel" },
  ];

  // Guest nav links
  const guestLinks = [
    { label: "Home", path: "/" },
    { label: "Blogs", path: "/blog" },
    { label: "Reels", path: "/reels" },
    { label: "Login", path: "/auth/login" },
    { label: "Register", path: "/auth/register" },
  ];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="https://flowbite.com/docs/images/logo.svg"
            alt="Flowbite Logo"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <span className="text-2xl font-semibold text-gray-900">
            ContentDekho
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center space-x-6">
          {(session ? authLinks : guestLinks).map(({ label, path }) => (
            <Link
              key={label}
              href={path}
              className="flex items-center gap-1 text-gray-800 font-medium hover:text-blue-600 transition"
            >
              <span>{label}</span>
            </Link>
          ))}

          {/* Show AccountDropdown for authenticated users */}
          {session && <AccountDropdown />}
        </div>
      </div>
    </nav>
  );
}
