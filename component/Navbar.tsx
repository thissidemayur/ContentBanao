"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Search } from "lucide-react";
import AccountDropdown from "@/component/user/Accountdropdown";
import { Home, FileText, Video, PlusSquare } from "lucide-react";
import SearchBar from "./SearchBar";

export default function MainNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const navLinks = [
    { label: "Home", path: "/", icon: Home },
    { label: "Blogs", path: "/blog", icon: FileText },
    { label: "Reels", path: "/reels", icon: Video },
    { label: "Add Blog", path: "/create-blog", icon: PlusSquare },
    { label: "Add Reel", path: "/add-reel", icon: PlusSquare },
  ];

  return (
    <nav className="bg-white border-b border-gray-200">
      {/* Top Row: Logo + Search */}
      <div className="max-w-screen-xl mx-auto flex  justify-between p-4 gap-6">
        <div className="flex items-center  justify-betweenspace-x-3">
          <Link href="/" className="flex items-end space-x-2">
            <Image
              src="https://flowbite.com/docs/images/logo.svg"
              alt="Flowbite Logo"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="text-2xl font-semibold">Flowbite</span>
          </Link>
          <div className="hidden md:block">
            <SearchBar />
          </div>
        </div>

        {/* Mobile Actions */}
        <div className="flex gap-3 md:hidden">
          <AccountDropdown />
          <button
            onClick={toggleMobileMenu}
            className="text-gray-500 p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Bottom Row: Desktop Nav Links */}
      <div className="hidden md:flex items-center justify-center space-x-8 border-t border-gray-100 p-2">
        {navLinks.map(({ label, path }) => (
          <Link
            key={label}
            href={path}
            className="text-gray-900 font-medium hover:text-blue-700 transition"
          >
            {label}
          </Link>
        ))}
        <AccountDropdown />
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 p-4 space-y-3 z-50 bg-white">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={16} className="text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="block w-full p-2 pl-9 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {navLinks.map(({ label, path }) => (
            <Link
              key={label}
              href={path}
              className="block text-gray-900 font-medium hover:text-blue-700"
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
