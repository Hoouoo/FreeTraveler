import React from "react";
import PostListTemplate from "../../component/post/PostListTemplate";
import PostReadForm from "../../component/post/read/PostReadForm";
import ItemCardGenerator from "../../component/list/ItemCardGenerator";
import { useSelector } from "react-redux";

export default function PostListCotainer({ id }) {
  return <PostListTemplate id={id}></PostListTemplate>;
}
