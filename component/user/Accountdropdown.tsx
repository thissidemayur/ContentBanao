'use client'

import React, { useEffect, useRef, useState } from "react";
import {
    User,
    CircleUserRound,
    KeyRound,
    Package,
    LogOut,
    UserX,
    Image,
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/features/auth/authSlice';
import Link from "next/link";
import { RootState, AppDispatch } from '@/lib/store';
import { signOut } from "next-auth/react";

interface AccountDropdownProps {
    identifier?: string;
    userName?: string;
    userImg?: string | null;
}

interface MenuItem {
    icon: React.ElementType;
    label: string;
    path: string;
}

interface MenuSection {
    section: string;
    items: MenuItem[];
}

export default function AccountDropdown({
    identifier = "user@example.com",
    userName = "User",
    userImg = null,
}: AccountDropdownProps) {

    const fetchUserData = useSelector((state: RootState) => state.auth.user)

    console.log("fetchUserData: ", fetchUserData)


    const dispatch = useDispatch<AppDispatch>();

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const trigger = useRef<HTMLButtonElement>(null);
    const dropdown = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const clickHandler = (e: MouseEvent) => {
            const target = e.target as Node;
            if (!dropdown.current || !trigger.current) return;

            if (
                !dropdownOpen ||
                dropdown.current.contains(target) ||
                trigger.current.contains(target)
            ) {
                return;
            }
            setDropdownOpen(false);
        };

        document.addEventListener("click", clickHandler);
        return () => document.removeEventListener("click", clickHandler);
    }, [dropdownOpen]);

    // Close if Esc is pressed
    useEffect(() => {
        const keyHandler = (e: KeyboardEvent) => {
            if (!dropdownOpen || e.key !== "Escape") return;
            setDropdownOpen(false);
        };
        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
    }, [dropdownOpen]);



    const menuItems: MenuSection[] = [
        {
            section: "Profile",
            items: [
                { icon: CircleUserRound, label: "View Profile", path: "/profile" },
                { icon: KeyRound, label: "Update Password", path: "/update-password" },
            ],
        },
        {
            section: "User Resource",
            items: [
                { icon: Package, label: "All-Blogs", path: "/blogs" },
                { icon: Package, label: "All-Reels", path: "/reels" },
            ],
        },
        {
            section: "Account Settings",
            items: [
                { icon: Image, label: "Update Profile", path: "/update-profile" },
                { icon: UserX, label: "Delete Account", path: "/delete-account" },
            ],
        },
    ];


    const handleLogout = async () => {
        try {
            dispatch(logout())
            await signOut({ callbackUrl: "/" })  // clear NextAuth JWT session and redirect to homepage
        } catch (error) {
            console.error("Logout error:", error)
        }
    }


    return (
        <div className="relative">
            <button
                ref={trigger}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 z-100 text-gray-500 p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
                {fetchUserData?.image ? (
                    <img
                        src={fetchUserData?.image}
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover"
                    />
                ) : (
                    <User size={24} className="text-black" />
                )}
                <span className="hidden md:block text-sm">
                    {fetchUserData?.userName?.substring(0, 5)}
                </span>
                <span className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                            d="M2 5L8 11L14 5"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </span>
            </button>

            <div
                ref={dropdown}
                onFocus={() => setDropdownOpen(true)}
                onBlur={() => setDropdownOpen(false)}
                className={`absolute right-0 mt-2 w-64 rounded-xl bg-white shadow-lg border border-black overflow-hidden transition-all duration-200 ${dropdownOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                    }`}
            >
                <div className="px-4 py-3 border-b border-black">
                    <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden">
                            {fetchUserData?.image ? (
                                <img
                                    src={fetchUserData?.image}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <User size={28} className="text-black" />
                            )}
                            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white"></span>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-black">
                                {fetchUserData?.userName}
                            </p>
                            <p className="text-sm font-semibold text-black">
                                {fetchUserData?.name}
                            </p>
                            <p className="text-xs text-black/70">
                                {fetchUserData?.email}
                            </p>
                        </div>
                    </div>
                </div>

                {menuItems.map((section, index) => (
                    <div key={index} className="border-b border-black last:border-b-0">
                        <div className="px-4 py-2 text-xs font-semibold text-black uppercase">
                            {section.section}
                        </div>
                        {section.items.map((item, idx) => (
                            <Link
                                key={idx}
                                href={item.path}
                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-black hover:bg-black/10 transition-colors duration-150 cursor-pointer"
                                onClick={() => setDropdownOpen(false)}
                            >
                                <item.icon size={16} className="text-black" />
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </div>
                ))}

                <div className="border-t border-black">
                    <button
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-black hover:bg-black/10 transition-colors duration-150 cursor-pointer"
                        onClick={handleLogout}
                    >
                        <LogOut size={16} className="text-black" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
