import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  /* 공통 스타일 */
  display: inline-flex;
  outline: none;
  border: none;
  border-radius: 25px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;
  text-align: center;
  line-height: 30px;

  /* 크기 */
  height: 2.25rem;
  font-size: 1rem;

  /* 색상 */
  background: rgb(0, 241, 180);
  &:hover {
    background: rgb(0, 241, 175);
  }
  &:active {
    background: rgb(0, 241, 175);
  }

  /* 기타 */
  & + & {
    margin-left: 1rem;
  }
`;

function PostButton({ children, ...rest }) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}

export default PostButton;
