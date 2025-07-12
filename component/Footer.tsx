"use client";

import Link from "next/link";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white mt-16">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* About */}
        <div className="text-center md:text-left space-y-3">
          <h3 className="text-xl font-bold text-gray-900">Hey, I'm Mayur 👋</h3>
          <p className="text-gray-600 text-sm max-w-sm leading-relaxed">
            CS undergrad passionate about backend, DevOps, and SaaS products.
            Love building clean, scalable, modern web apps using real-world
            tech.
          </p>
          <p className="text-sm text-gray-800 font-medium">
            🚀 Available for{" "}
            <span className="font-semibold text-black">Freelancing</span>,{" "}
            <span className="font-semibold text-black">Internships</span>,{" "}
            <span className="font-semibold text-black">Collaborations</span>, &{" "}
            <span className="font-semibold text-black">Team-Ups</span>.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex items-center space-x-5">
          <Link
            href="https://github.com/thissidemayur"
            target="_blank"
            className="text-gray-500 hover:text-black transition duration-200"
          >
            <FaGithub size={22} />
          </Link>
          <Link
            href="https://instagram.com/thissidemayur"
            target="_blank"
            className="text-gray-500 hover:text-pink-600 transition duration-200"
          >
            <FaInstagram size={22} />
          </Link>
          <Link
            href="https://x.com/thissidemayur"
            target="_blank"
            className="text-gray-500 hover:text-blue-500 transition duration-200"
          >
            <FaXTwitter size={22} />
          </Link>
          <Link
            href="mailto:thissidemayur@email.com"
            className="text-gray-500 hover:text-green-600 transition duration-200"
          >
            <MdEmail size={24} />
          </Link>

          <Link
            href="https://in.linkedin.com/in/thissidemayur"
            target="_blank"
            className="text-gray-500 hover:text-green-600 transition duration-200"
          >
            <FaLinkedin size={24} />
          </Link>
        </div>
      </div>

      <div className="border-t border-gray-100 py-4">
        <p className="text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Mayur. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
