"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Menu, Search } from "lucide-react";
import AccountDropdown from "@/component/user/Accountdropdown";
import SearchBar from "./SearchBar";

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
      {/* Top Nav: Logo + Links + Account */}
      <div className="max-w-screen-xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="https://ik.imagekit.io/thissidemayur/contentBanao-logo-transparent_1RRhSMDb9P.png"
            alt="ContentBanao Logo"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
            priority
          />
          <span className="text-xl md:text-2xl font-extrabold tracking-tight text-gray-900">
            Content<span className="text-blue-600">Banao</span>
          </span>
        </Link>

        {/* Desktop Links */}
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

        {/* Right: Account + Hamburger */}
        <div className="flex items-center gap-2">
          {session && <AccountDropdown />}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-screen-xl mx-auto px-4 pb-4">
        <div className="relative">
          <SearchBar />
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 px-4 pb-4 pt-2 space-y-2 bg-white">
          {links.map(({ label, path }) => (
            <Link
              key={label}
              href={path}
              onClick={() => setMobileOpen(false)}
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
