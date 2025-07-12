import BlogPage from "@/component/blog/BlogPage";
import RecentPosts from "@/component/blog/BlogRecent";
import CommentForm from "@/component/comment/CommentForm";
import CommentList from "@/component/CommentList";
import React from "react";

interface Props {
  params: {
    slug: string;
  };
}

async function Page({ params }: Props) {
  // Directly await if necessary (if Next complains later)
  const { slug } = await params;
  return (
    <div>
      {/* {comment section integreated in BLogPage} */}
      <BlogPage slug={slug} />
      <RecentPosts />
    </div>
  );
}

export default Page;
