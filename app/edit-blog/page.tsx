"use client";

import BlogForm, { BlogFormValues } from "@/component/blog/BlogForm";
import {
  useGetBlogByIDQuery,
  useUpdateBlogMutation,
} from "@/features/blogs/blogsApi";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export default function EditBlogPage() {
  const id = useSearchParams().get("id")!;
  const { data, isLoading: isFetching } = useGetBlogByIDQuery(id);
  const [updateBlog, { isLoading }] = useUpdateBlogMutation();
  const router = useRouter();

  const handleUpdate = async (data: BlogFormValues) => {
    try {
      await updateBlog({
        id,
        updateBlog: {
          title: data.title,
          summary: data.summary,
          content: data.content,
          tags: data.tags,
          image: data.image,
        },
      }).unwrap();
      toast.success("✅ Blog updated!");
      setTimeout(() => {
        router.push("/blog");
      }, 1000);
    } catch (error) {
      console.log("error: ", error);
      toast.error((error as any).data.error);
    }
  };

  if (isFetching) return <p>Loading...</p>;

  return (
    <BlogForm
      mode="edit"
      initialData={data?.data}
      onSubmit={handleUpdate}
      isSubmitting={isLoading}
    />
  );
}
