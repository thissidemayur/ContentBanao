"use client"



import { useLikeBlogMutation } from '@/features/blogs/blogsApi';
import { useAuth } from '@/hooks/userAuth'
import React, { useState } from 'react'

export default function LikeButton({ slug, initialLikes, initialLiked }) {
    const { userAuth, isAuthenticated } = useAuth()

    const [likes, setLikes] = useState(initialLikes);
    const [liked, setLiked] = useState(initialLiked);

    const [likeResponse] = useLikeBlogMutation(slug)
    const toggleLike = async () => {
        if (!isAuthenticated) {
            alert("Please login first!");
            return;
        }
        setLiked(likeResponse.liked)
        setLikes(likeResponse.likes)



    }

    return (
        <button
            onClick={toggleLike}
            className={`text-xl px-4 py-2 rounded-lg flex items-center gap-2 ${liked ? "text-red-500" : "text-gray-500"
                }`}
        >
            ❤️ {likes}
        </button>

    )
}
