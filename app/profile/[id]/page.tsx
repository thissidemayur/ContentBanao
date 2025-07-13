"use client";
import { useParams } from "next/navigation";

import React from "react";
import ViewProfile from "@/component/user/UserProfile";
import UserBlog from "@/component/blog/UserBlog";

export default function page() {
  const params = useParams<{ id: string }>();
  console.log("params: ", params.id);
  return (
    <>
      <ViewProfile id={params.id} />
      <UserBlog id={params.id} />
    </>
  );
}
