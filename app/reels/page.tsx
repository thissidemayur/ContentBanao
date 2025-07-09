"use client";

import React from "react";
import VideoCard from "@/component/reel/ReelCard";
import { useGetReelQuery } from "@/features/reels/reelsApi"; // your actual RTK Query hook
import { Loader2 } from "lucide-react"; // optional loader icon

export default function ReelsFeed() {
  const { data: reels, isLoading, isError } = useGetReelQuery();

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-950 text-white">
        <Loader2 className="animate-spin w-8 h-8 mr-2" />
        Loading reels...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="fixed inset-0 flex items-center justify-center text-red-500 bg-gray-950">
        Failed to load reels.
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-950 overflow-hidden">
      {/* Scrollable Reel Feed */}
      <div className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
        {reels && reels.length === 0 ? (
          <div className="h-screen flex items-center justify-center text-gray-400 text-lg">
            No reels found. 🚫
          </div>
        ) : (
          reels?.map((reel) => (
            <div
              key={reel._id}
              className="h-screen snap-start flex justify-center items-center"
            >
              <VideoCard
                videoUrl={reel.media.url}
                thumbnailUrl={reel.thumbnailUrl}
                author={{
                  avatar: reel.authorId.avatar,
                  userName: reel.authorId.userName,
                }}
                title={reel.title}
                description={reel.description}
                likesCount={reel.likes.length}
                commentsCount={reel.comments.length || 0}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
