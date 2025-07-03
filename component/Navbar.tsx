'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, Search } from 'lucide-react';
import AccountDropdown from './user/Accountdropdown';


export default function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="bg-white border-b border-gray-200">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-3">
                    <Image
                        src="https://flowbite.com/docs/images/logo.svg"
                        alt="Logo"
                        width={32}
                        height={32}
                        className="h-8 w-8"
                    />
                    <span className="self-center text-2xl font-semibold">Flowbite</span>
                </Link>

                {/* Desktop Search */}
                <div className="hidden md:block relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Search size={16} className="text-gray-500" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="block w-full p-2 pl-9 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Mobile toggle button */}



                <div className="md:hidden  flex gap-3">
                    <AccountDropdown />
                    <button
                        type="button"
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden text-gray-500 p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    >
                        <Menu size={24} />
                        <span className="sr-only">Toggle navigation</span>
                    </button>

                </div>


                {/* Desktop Nav Links */}
                <div className="hidden md:flex md:items-center md:space-x-8">
                    <Link href="/" className="text-blue-700 font-medium hover:underline">Home</Link>
                    <Link href="/blog" className="text-gray-900 font-medium hover:text-blue-700">Blogs</Link>
                    <Link href="/reels" className="text-gray-900 font-medium hover:text-blue-700">Reels</Link>
                    <Link href="/post" className="text-gray-900 font-medium hover:text-blue-700">Add Post</Link>
                    <AccountDropdown />
                </div>
            </div>

            {/* Mobile Nav */}
            {menuOpen && (<>
                <div className="md:hidden border-t border-gray-200 p-4 space-y-3 z-100">
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

                    <Link href="/" className="block text-blue-700 font-medium">Home</Link>
                    <Link href="/blog" className="block text-gray-900 font-medium">Blogs</Link>
                    <Link href="/reels" className="block text-gray-900 font-medium">Reels</Link>
                    <Link href="/post" className="text-gray-900 font-medium hover:text-blue-700">Add Post</Link>


                </div>
            </>

            )}
        </nav>
    );
}
