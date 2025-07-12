"use client";

import { useAuth } from "@/hooks/userAuth";
import ReelCard from "./ReelCard";

export default function ReelList({ reels }: { reels: any[] }) {
  console.log(reels.map((r) => r._id));
  const { userAuth } = useAuth();
  const currentUserId = userAuth?.id;
  return (
    <>
      {reels.map((reel, index) => (
        <div
          key={`${reel._id}-${index}`}
          className="h-screen snap-start flex justify-center items-center"
        >
          <ReelCard
            videoUrl={reel.media.url}
            thumbnailUrl={reel.thumbnailUrl}
            author={{
              avatar: reel.authorId.avatar,
              userName: reel.authorId.userName,
            }}
            title={reel.title}
            description={reel.description}
            likesCount={reel.likes.length}
            slug={reel._id}
            likedByMe={reel.likes.includes(currentUserId)}
            // commentsCount={reel.comments.length || 0}
          />
        </div>
      ))}
    </>
  );
}
