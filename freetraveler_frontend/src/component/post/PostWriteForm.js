import React from "react";
import styled from "styled-components";
import PostTemplate from "./PostTemplate";

const PWForm = styled.form`
  width: auto;
  height: 100%;
`;

const PostInput = styled.input``;

export default function PostWriteForm({ id }) {
  return (
    <PWForm>
      <PostInput type="text" />
    </PWForm>
  );
}
