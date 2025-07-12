# 📖 ContentBanao — Personal Blogging (Blog + Reel) Platform ✨

A modern, SaaS-style, fully responsive **blogging and reel-sharing platform** built with the latest **Next.js 15 App Router**, **TypeScript**, **Tailwind CSS**, **Redux Toolkit (RTK Query)**, **NextAuth**, and **MongoDB**. It empowers users to write rich blogs, upload engaging reels, and interact in a clean, scalable, and modern social environment.

---

## 🚀 Live Demo

👉 Coming soon... (you can add your link here once deployed via Vercel or any platform)

---

## 📦 Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS, Shadcn, Aceternity UI, Lucide Icons
- **State Management**: Redux Toolkit + RTK Query
- **Authentication**: NextAuth (Credential + Google OAuth-ready)
- **Database**: MongoDB (via Mongoose)
- **Editor**: TipTap (Rich Text Editor)
- **Media Upload**: ImageKit (image & video CDN)
- **Deployment**: Vercel

---

## 📊 Features

### 🌐 Core Architecture

- ✅ Next.js 15 with the new App Router
- ✅ TypeScript support across the entire codebase
- ✅ Modular project structure: app/, components/, features/, lib/, model/, etc.
- ✅ Tailwind CSS for modern utility-first UI styling
- ✅ Public asset management via /public
- ✅ Centralized middleware.ts with route protection logic

### 🔐 Authentication & Access Control

- ✅ NextAuth.js integration with credentials provider
- ✅ JWT-based route protection via middleware
- ✅ Public Routes:
  - /, /blog, /reels, /auth/login, /auth/register, /blog/[slug]
- ✅ Protected Routes (authentication required):
  - /create-blog, /add-reel, dashboard, user actions, etc.

### 📄 Blogging System

- ✅ Blog creation page: /create-blog
- ✅ Blog listing page: /blog
- ✅ Dynamic blog detail pages: /blog/[slug]
- ✅ Recent blog sidebar with latest posts
- ✅ Modular blog card components
- ✅ Comment section placeholder included
- ✅ Public read access for all blogs

### 📹 Reels System

- ✅ Reels feed page: /reels
- ✅ Add reel page for authenticated users: /add-reel
- ✅ ImageKit integration for reel video uploads
- ✅ Paginated API endpoint for reels
- ✅ Reels are publicly viewable

### 📡 API & State Management

- ✅ RTK Query for efficient API communication
- ✅ Redux Toolkit for global state management
- ✅ Organized features/ folder: auth/, blogs/, comments/, reels/
- ✅ Modular API routes inside app/api/

### 📱 Responsive & Accessible UI

- ✅ Fully responsive navbar with mobile hamburger menu and auth-aware navigation
- ✅ Reusable, scalable UI components
- ✅ Consistent design system (spacing, color, typography)

### 🖼️ Image & Media Handling

- ✅ Static assets served from /public
- ✅ ImageKit for uploading and hosting reels

### 🚧 Planned / In Progress

- 🔄 Google OAuth

## 🛠️ Getting Started

Clone the project and install dependencies:

```bash
git clone https://github.com/thissidemayur/ContentBanao
cd ContentBanao
npm install
```

##⚙️ Environment Variables
Create a .env.local file in the root and add:

env
Copy code

```bash
MONGODB_URI=
NEXTAUTH_SECRET=
NEXTAUTH_URL=

IMAGEKIT_PRIVATE_KEY=
NEXT_AUTH_IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_URL_ENDPOINT="https://ik.imagekit.io/[your_userName]"

NODE_ENV="development"
NEXT_PUBLIC_AUTH_BACKEND_BASE_URL=
NEXT_PUBLIC_NEXTAUTH_URL=
```

## 🧑‍💻Run Locally

```bash
npm run dev
# or
yarn dev
```

````bash

```bash Visit: http://localhost:3000 ```
````

## 📂 Folder Structure

```bash
├── app/
│   ├── add-reel/
│   ├── api/
│   │   ├── auth/
│   │   ├── comments/
│   │   ├── imagekit-auth/
│   │   ├── post/
│   │   ├── reel/
│   │   ├── search/
│   │   └── user/
│   ├── auth/
│   ├── blog/
│   ├── create-blog/
│   ├── dashboard/
│   ├── edit-blog/
│   ├── profile/
│   ├── providers/
│   ├── reels/
│   ├── ClientLayout.tsx
│   ├── StoreProvider.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── component/                 # 3rd-party UI components (e.g., TipTap)
│   ├── tiptap-extension/
│   ├── tiptap-icons/
│   ├── tiptap-node/
│   ├── tiptap-templates/
│   ├── tiptap-ui/
│   ├── tiptap-ui-primitive/
│   └── ui/
├── components/                # Custom reusable components
│   ├── blog/
│   ├── comment/
│   ├── reel/
│   ├── skelton/
│   ├── upload/
│   ├── user/
│   ├── About.tsx
│   ├── Carousel.tsx
│   ├── CTA.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── HomeBlog.tsx
│   ├── LikeButton.tsx
│   ├── Navbar.tsx
│   ├── Provider.tsx
│   ├── SearchBar.tsx
│   ├── SigninForm.tsx
│   ├── SignOut.tsx
│   └── Singup.tsx
├── features/                 # RTK slices and RTK Query endpoints
│   ├── auth/
│   ├── blogs/
│   ├── comments/
│   └── reels/
├── hooks/                    # Custom React hooks
├── lib/                      # Utilities, DB, Auth, Store
│   ├── auth.lib.ts
│   ├── Backend-helperFn.ts
│   ├── db.lib.ts
│   ├── hooks.ts
│   ├── store.ts
│   ├── tiptap-utils.ts
│   └── utils.ts
├── model/                    # Mongoose schemas
│   ├── blog.model.ts
│   ├── comment.model.ts
│   ├── reels.model.ts
│   └── user.model.ts
├── public/                   # Static assets
├── styles/                   # Tailwind and custom styles
├── types/                    # TypeScript types
├── middleware.ts
├── next-env.d.ts
├── next.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── package.json
├── package-lock.json
├── eslint.config.mjs
├── components.json
└── README.md

```

## 🤝 Contributing

Contributions are welcome and appreciated! Whether it's reporting a bug, requesting a feature, or submitting a pull request—every bit helps improve this project.

### How to Contribute

1. **Fork** this repository
2. **Create** a new branch
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 👤 Author

**Mayur**  
GitHub: [@thissidemayur](https://github.com/thissidemayur)

### 🌐 Connect with me

- 🐦 X (Twitter): [@thissidemayur](https://x.com/thissidemayur)
- 💼 LinkedIn: [@thissidemayur](https://www.linkedin.com/in/thissidemayur)
- 📸 Instagram: [@thissidemayur](https://www.instagram.com/thissidemayur)

---

## ⭐ Support

If you find this project helpful or inspiring, please consider giving it a ⭐ on [GitHub](https://github.com/thissidemayur).  
Your support motivates continued development and improvement!
