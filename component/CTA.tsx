"use client";

import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { useAuth } from "@/hooks/userAuth";
import Link from "next/link";
import React from "react";

const people = [
  {
    id: 4,
    name: "Sonam",
    designation: "Content Creator",
    image: "https://ik.imagekit.io/thissidemayur/sonam_93olQWpDv.jpeg",
  },
  {
    id: 5,
    name: "Chahat Pal",
    designation: "Student @ APS, Banaras",
    image: "https://ik.imagekit.io/thissidemayur/chacht_ilK0hnfn7.jpeg",
  },
  {
    id: 1,
    name: "Samiksha Pal",
    designation: "Student @ Sunbean, Varanasi  Creator",
    image: "https://ik.imagekit.io/thissidemayur/samikha_pRqvhWrli.jpeg",
  },
  {
    id: 2,
    name: "Mayur Pal",
    designation: "Developer",
    image: "https://ik.imagekit.io/thissidemayur/mayur_956eQG6-4.jpeg",
  },
  {
    id: 3,
    name: "Aniska Pal ",
    designation: "Student @ Sunbean, Varanasi ",
    image: "https://ik.imagekit.io/thissidemayur/ansika_RhjFNkNUmj.jpeg",
  },

  {
    id: 6,
    name: "Aman",
    designation: "Content Creator",
    image: "https://ik.imagekit.io/thissidemayur/modak_3kxE1N9l-e.jpeg",
  },

  {
    id: 9,
    name: "Vinay ",
    designation: "Content Creator",
    image: "https://ik.imagekit.io/thissidemayur/vinay_m3DC8qlsz.avif",
  },
  {
    id: 8,
    name: "Khushi Pal ",
    designation: "Student @ APS, Banaras",
    image:
      "https://ik.imagekit.io/thissidemayur/Screenshot_from_2025-07-13_19-36-53_LSb6RGcGCH.png",
  },
];

const CTA = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="relative py-16">
      {/* Background gradients */}
      <div
        aria-hidden="true"
        className="absolute inset-0 h-max w-full m-auto grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
      >
        <div className="blur-[106px] h-56 bg-gradient-to-br from-teal-500 to-purple-400 dark:from-blue-700" />
      </div>
      <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600" />
      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
        <div className="relative">
          {/* Avatar images */}
          <div className="flex flex-row items-center justify-center mb-10 w-full">
            <AnimatedTooltip items={people} />
          </div>

          {/* Heading and buttons */}
          <div className="mt-6 m-auto space-y-6 md:w-8/12 lg:w-7/12">
            <h1 className="text-center text-2xl font-bold text-gray-800 dark:text-white md:text-5xl">
              Join a Creative, Insightful Community
            </h1>
            <p className="text-center text-xl text-gray-600 dark:text-gray-300">
              Discover trending blog posts, inspiring creator stories, and
              binge-worthy reels curated for curious minds. No fluff, no
              clickbait — just authentic, valuable content you’ll love.
            </p>
            {!isAuthenticated && (
              <div className="flex flex-wrap justify-center gap-6">
                <Link
                  href="/auth/login"
                  className="relative flex h-12 w-full items-center justify-center px-8 before:absolute before:inset-0 before:rounded-full before:bg-cyan-600 before:transition before:duration-300 hover:before:bg-cyan-700 active:duration-75 active:before:scale-95 sm:w-max"
                >
                  <span className="relative text-base font-semibold text-white">
                    Signup
                  </span>
                </Link>
                <Link
                  href="/auth/register"
                  className="relative flex h-12 w-full items-center justify-center px-8 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-teal-500/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max"
                >
                  <span className="relative text-base font-semibold text-cyan-600 dark:text-white">
                    Login
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTA;
