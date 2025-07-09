import BlogPostForm from "@/component/blog/BlogPostForm";
import React from "react";

export default function page() {
  return (
    <div className="h-[calc(100vh-200px)] overflow-y-auto bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <BlogPostForm />
      </div>
    </div>
  );
}
