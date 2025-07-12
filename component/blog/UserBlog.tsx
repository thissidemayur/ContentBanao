"use client";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { responseBlog, useGetUserBlogsQuery } from "@/features/blogs/blogsApi"; // your RTK query
import Link from "next/link";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { useAuth } from "@/hooks/userAuth";

const UserPosts = () => {
  const { userAuth } = useAuth();
  const shouldFetch = Boolean(userAuth?.userName);
  function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
    return typeof error === "object" && error !== null && "status" in error;
  }
  const { data, isLoading, isError, error } = useGetUserBlogsQuery(
    userAuth?.userName as string, // safely cast now because skip prevents undefined call
    {
      skip: !shouldFetch, // prevent fetch until userName is available
    }
  );

  if (!shouldFetch) {
    return <p>User name must present</p>;
  }

  const blogs = data?.data.blogs;
  const hasBlogs = blogs && blogs.length > 0;

  console.log("data: ", blogs?.[0].media?.[0].url);
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">
          Your Posts
        </h3>

        {/* Loading State */}
        {isLoading && (
          <p className="text-center text-gray-500">Fetching your posts...</p>
        )}

        {/* Error State */}
        {isError && (
          <p className="text-center text-red-500">
            {isFetchBaseQueryError(error)
              ? (error.data as any)?.message || "Failed to load posts"
              : "Something went wrong"}
          </p>
        )}

        {/* Empty State */}
        {!isLoading && !isError && !blogs?.length && (
          <p className="text-center text-gray-500">No posts available.</p>
        )}

        {/* Posts Grid */}
        {!isLoading && !isError && hasBlogs && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {blogs?.map((post: responseBlog) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug}`}
                className="group relative rounded-xl overflow-hidden shadow border border-gray-200 hover:scale-[1.02] transition duration-200"
              >
                {/* Image */}
                {post.media?.[0].url ? (
                  <Image
                    src={post.media?.[0].url}
                    alt={post.title || "alt"}
                    width={500}
                    height={300}
                    className="object-cover w-full h-48"
                  />
                ) : (
                  <div className="flex items-center justify-center h-48 bg-gray-100 text-gray-400">
                    <ImageIcon size={48} />
                  </div>
                )}

                {/* Title */}
                <div className="p-4">
                  <p className="text-gray-800 font-semibold text-lg">
                    {post.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPosts;
