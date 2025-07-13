"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Menu } from "lucide-react";
import AccountDropdown from "@/component/user/Accountdropdown";

export default function MainNavbar() {
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  const authLinks = [
    { label: "Home", path: "/" },
    { label: "Blogs", path: "/blog" },
    { label: "Reels", path: "/reels" },
    { label: "Add Blog", path: "/create-blog" },
    { label: "Add Reel", path: "/add-reel" },
  ];

  const guestLinks = [
    { label: "Home", path: "/" },
    { label: "Blogs", path: "/blog" },
    { label: "Reels", path: "/reels" },
    { label: "Login", path: "/auth/login" },
    { label: "Register", path: "/auth/register" },
  ];

  const links = session ? authLinks : guestLinks;

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap12">
          {/* Logo */}
          <Image
            src="https://ik.imagekit.io/thissidemayur/contentBanao-logo-transparent_1RRhSMDb9P.png"
            alt="ContentBanao Logo"
            width={150}
            height={150}
            className="h-10 w-10 md:h-12 md:w-12 object-contain"
            priority
          />

          {/* Text */}
          <span className="text-xl md:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Content<span className="text-blue-600">Banao</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          {links.map(({ label, path }) => (
            <Link
              key={label}
              href={path}
              className="text-gray-800 font-medium hover:text-blue-600 transition"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right Section: Account Dropdown and Hamburger */}
        <div className="flex items-center gap-0.5">
          {session && <AccountDropdown />}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 px-4 pb-4 pt-2 space-y-2 bg-white">
          {links.map(({ label, path }) => (
            <Link
              key={label}
              href={path}
              onClick={() => setMobileOpen(false)} // close on click
              className="block text-gray-800 font-medium hover:text-blue-600 transition"
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
