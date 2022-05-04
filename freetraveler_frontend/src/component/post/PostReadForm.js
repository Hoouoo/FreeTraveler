import React from "react";
import styled from "styled-components";
import PostTemplate from "./PostTemplate";

const PRForm = styled.form`
  width: auto;
  height: 100%;
`;

const PostInput = styled.input``;

export default function PostReadForm({ id }) {
  return (
    <PRForm>
      <PostInput type="text" />
    </PRForm>
  );
}
