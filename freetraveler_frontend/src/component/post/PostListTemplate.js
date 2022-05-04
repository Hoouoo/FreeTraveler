import React from "react";
import styled from "styled-components";

const PostListBox = styled.div`
  width: auto;
  height: 100%;
  padding: 35px;
  margin: 35px;
  border-radius: 5px;
  background-color: green;

  #itemcard_list {
    list-style-type: none;
    padding: 1px;
  }

  @media screen and (min-width: 1111px) {
    #itemcard_list {
      display: grid;
      grid-template-columns: 50% 50%;
      justify-content: center;
      align-items: center;
      padding: 1px;
    }
  }

  @media screen and (max-width: 612px) {
    padding: 5px;
    margin: 5px;
  }
`;

export default function PostListTemplate({ children }) {
  return (
    <>
      <PostListBox>{children}</PostListBox>
    </>
  );
}
