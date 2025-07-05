import {
  useDeleteCommentMutation,
  useGetCommentQuery,
} from "@/features/comments/commentsApi";
import React from "react";
import CommentCard from "./CommentCard";
import { useAuth } from "@/hooks/userAuth";

type Comment = {
  _id: string;
  content: string;
  authorId: {
    userName: string;
    _id: string;
  };
};

export default function CommentList({ blogId }: { blogId: string }) {
  const { data, error, isLoading } = useGetCommentQuery(blogId);

  const { userAuth } = useAuth();
  const currentUserId = userAuth?.id;
  const [deleteComment, { isLoading: isDeleting }] = useDeleteCommentMutation();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching comments</p>;

  const handleDelete = async (commentId: string) => {
    try {
      const res = await deleteComment(commentId).unwrap();
    } catch (error) {
      console.error("Failed to delete comment", error);
      return;
    }
  };

  return (
    <div className="space-y-4 mt-6">
      {data.data?.map((comment: Comment) => (
        //
        <CommentCard
          key={comment._id}
          name={`${comment.authorId.userName || comment.authorId._id}`}
          time="2022-11-13T20:00:00Z"
          message={comment.content}
          avatarUrl={`${comment.authorId}`}
          likes={12}
          onDelete={() => handleDelete(comment._id)}
          canDelete={currentUserId === comment.authorId._id}
        />
      ))}
    </div>
  );
}

// console.log("comment.authorId: ", typeof comment.authorId);
// console.log("currentUserId: ", typeof currentUserId);
// console.log(
//   "compare: ",
//   currentUserId ===
//     (typeof comment.authorId === "string"
//       ? comment.authorId
//       : comment.authorId._id)
// );
