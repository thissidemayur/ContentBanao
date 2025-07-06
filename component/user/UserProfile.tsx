"use client";

import { Mail, User, Edit, ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/hooks/userAuth";

export default function UserProfile() {
  const { userAuth } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.05)] border border-gray-200 p-8 sm:p-10 space-y-8">
          {/* Top Row: Avatar + Username + Button */}
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-6">
            {/* Avatar */}
            <div className="relative w-28 h-28 rounded-full border-4 border-gray-100 shadow-md overflow-hidden">
              {userAuth?.avatar ? (
                <Image
                  src={userAuth.avatar}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-100">
                  <User size={50} className="text-gray-400" />
                </div>
              )}
            </div>

            {/* Username + Button */}
            <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-4">
              <h2 className="text-3xl font-bold text-gray-900 text-center sm:text-left">
                {userAuth?.userName || "Unnamed User"}
              </h2>

              <Link
                href="/update-profile"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white transition"
              >
                <Edit size={16} />
                Edit Profile
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-center sm:justify-start gap-12 border-t border-gray-200 pt-6">
            <div className="text-center">
              <p className="text-xl font-semibold text-gray-900">12</p>
              <p className="text-gray-500 text-sm">Posts</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-semibold text-gray-900">230</p>
              <p className="text-gray-500 text-sm">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-semibold text-gray-900">180</p>
              <p className="text-gray-500 text-sm">Following</p>
            </div>
          </div>

          {/* Full Name */}
          {userAuth?.name && (
            <div className="border-t border-gray-200 pt-4">
              <p className="text-gray-800 text-base font-medium">
                {userAuth.name}
              </p>
            </div>
          )}

          {/* Email */}
          {userAuth?.email && (
            <div className="border-t border-gray-200 pt-4">
              <p className="text-gray-600 text-sm">{userAuth.email}</p>
            </div>
          )}

          {/* Bio */}
          {userAuth?.bio && (
            <div className="border-t border-gray-200 pt-4">
              <p className="text-gray-700 text-sm leading-relaxed break-words whitespace-pre-wrap">
                {userAuth.bio}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
