"use client";
import { useAddCommentMutation } from "@/features/comments/commentsApi";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormValues = {
  content: string;
};

type CommentFormProps = {
  blogId: string;
  onCommentAdded: () => void;
};
export default function CommentForm({
  blogId,
  onCommentAdded,
}: CommentFormProps) {
  const [addComment] = useAddCommentMutation();

  const { register, handleSubmit, reset } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await addComment({ blogId, content: data.content });
      onCommentAdded(); // to triggered comment list refresh
      reset(); // clear form
    } catch (error) {
      console.error("Error adding comment", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex justify-center items-center my-8"
    >
      <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-lg border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Add a Comment
        </h2>

        <textarea
          {...register("content", { required: true })}
          placeholder="Write your thoughts here..."
          className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />

        <div className="flex items-center justify-between mt-3">
          <span className="text-sm text-gray-500">Minimum 15 characters.</span>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-6 py-2 rounded-lg transition"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
