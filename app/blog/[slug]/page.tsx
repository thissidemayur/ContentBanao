import BlogPage from "@/component/blog/BlogPage";
import RecentPosts from "@/component/blog/BlogRecent";
import React from "react";

type Props = {
  params: {
    slug: string;
  };
};

export default function Page({ params }: Props) {
  console.log("Received params:", params);
  const { slug } = params;
  return (
    <div>
      <BlogPage slug={slug} />
      <RecentPosts />
    </div>
  );
}
