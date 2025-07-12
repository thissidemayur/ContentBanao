import BlogPage from "@/component/blog/BlogPage";
import RecentPosts from "@/component/blog/BlogRecent";

import React from "react";

interface Props {
  params: {
    slug: string;
  };
}

function Page({ params }: Props) {
  // Directly await if necessary (if Next complains later)
  console.log("Received params:", params);

  const { slug } = params;
  return (
    <div>
      {/* {comment section integreated in BLogPage} */}
      <BlogPage slug={slug} />
      <RecentPosts />
    </div>
  );
}

export default Page;
