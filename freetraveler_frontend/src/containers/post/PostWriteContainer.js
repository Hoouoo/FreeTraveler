import React from "react";
import PostWriteForm from "../../component/post/write/PostWriteForm";

export default function PostWriteContainer({ id, mode }) {
  return <PostWriteForm id={id} mode={mode} />;
}
