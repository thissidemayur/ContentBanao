import React from "react";
import ViewProfile from "@/component/user/UserProfile";
import UserBlog from "@/component/blog/UserBlog";

export default function page() {
  return (
    <>
      <ViewProfile />
      <UserBlog />
    </>
  );
}
