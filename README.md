# 📖 Personal Blogging(both blog+reelBlog) Platform 📚✨

A modern SaaS-style social platform built with **Next.js 15 App Router**, **TypeScript**, **Tailwind CSS**, **Redux Toolkit (RTK Query)**, **NextAuth**, and **MongoDB (Mongoose)**, **React**, **Imagekit**, **Tip-tap(rich text editor)**,,. It offers users a rich experience to create, view, and interact with **blogs and video reels**, featuring authentication, search, and a clean, mobile-friendly design.

---

## 🚀 Features

- ✅ User Sign Up / Sign In with NextAuth & JWT
- ✅ Password-less Google Auth (ready for integration)
- ✅ Create, Edit,Delete and View Users
- ✅ Create, Edit,Delete and View Blogs
- ✅ Save the Blogs as Draft
- ✅ Upload and View Reels (like TikTok, with infinite scroll)
- ✅ Like on Reels
- ✅ Like on Comments on Blogs
- ✅ Search Bar to find Blogs, Reels, and Users (keyword-based)
- ✅ Responsive, SaaS-style UI with shadcn, Aceternity, and Lucide icons
- ✅ Skeleton Loaders for Reels and Blogs
- ✅ Modular RTK Query API services for Blogs, Reels, Comments, Users
- ✅ Protected API routes via Next.js server actions & JWT middleware
- ✅ Clean, modular, scalable codebase structure
- ✅ Ready for deployment on **Vercel**

---

## 📁 Project Structure

---

.
├── app/ # Next.js App Router pages & APIs
│ ├── api/ # Modular API route handlers
│ ├── blog/ reels/ # App router pages
│ └── layout.tsx # App layout with providers
│
├── component/ # All reusable UI components
│ ├── blog/ reel/ # Folder-wise components
│ ├── skelton/ # Loading placeholders
│ └── user/ # User dropdown/profile/logout
│
├── components/ # Tiptap (Rich Text Editor) components
│
├── features/ # Redux Toolkit slices and RTK Query services
│ ├── auth/
│ ├── blogs/
│ └── reels/
│
├── hooks/ # Custom React hooks
├── lib/ # Utilities, DB config, helper functions
├── model/ # Mongoose models (Blog, User, Reel, Comment)
├── public/ # Static assets (images, icons)
├── styles/ # Global CSS and Tailwind config
├── types/ # TypeScript custom types
├── middleware.ts # JWT auth middleware
├── next.config.ts # Next.js configuration
├── package.json # Dependencies & scripts
├── tsconfig.json # TypeScript config
└── README.md # 📄 This documentation

## 📸 Project Demo

> 🚀 Coming soon: Hosted Link & Screenshots  
> _(For now, screenshots available in `/public/screenshots`)_

---

## 📑 Features

- 🚀 Modern frontend with **Next.js 14 (App Router)**, **React**, **TypeScript**
- 🎨 Clean, responsive UI using **Tailwind CSS**, **Aceternity UI Components**, and **Lucide Icons**
- 🔐 Authentication & session management via **NextAuth**
- 📦 State management with **Redux Toolkit** + **RTK Query** for efficient API calls and caching
- 📤 Profile management (Update profile, Delete account, Update avatar)
- 📃 Create, Edit, Delete blog posts
- 🖼️ Image hosting integration with **ImageKit**
- ⚙️ Scalable and modular folder structure, optimized for SaaS-grade applications
- 📲 Protected routes and dynamic profile pages
- ✨ Clean toast notifications (planned for v1.1)
- 📷 Reel Blogging (short video-style posts) module coming soon in v2
- ***

## 🛠️ Tech Stack

**Frontend:**

- `Next.js` (App Router)
- `React`
- `TypeScript`
- `Tailwind CSS`
- `Redux Toolkit & RTK Query`
- `NextAuth`

**Image Handling:**

- `ImageKit`

**Icons & Components:**

- `Lucide-react`
- `Aceternity UI`

**State & Data Management:**

- `Redux Toolkit`
- `RTK Query`

---

## 📧 Maintainer

**Mayur**  
_BTech CSE | Next.js Developer | Cloud Native | SaaS Enthusiast_

---

## ✨ Contribution Note

New folders, conventions, or features **must be reflected in this README**. Keep this up-to-date for clarity and onboarding.

---
