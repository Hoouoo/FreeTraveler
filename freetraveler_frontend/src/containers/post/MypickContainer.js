import React from "react";
import PostListTemplate from "../../component/post/PostListTemplate";
import PostReadForm from "../../component/post/read/PostReadForm";

export default function MyPickContainer({ id }) {
  return <PostListTemplate id={id} isPick={"pick"}></PostListTemplate>;
}
