import React from "react";
import styled from "styled-components";
import palette from "../../../lib/styles/palette";

const StyledButton = styled.button`
  /* 공통 스타일 */
  width: 49%;
  display: inline-flex;
  outline: none;
  border: none;
  border-radius: 5px;
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
  background: ${palette.mint[1]};
  &:hover {
    background: ${palette.mint[0]};
  }
  &:active {
    background: ${palette.mint[0]};
  }
  /* 기타 */
  & + & {
    margin-left: 1rem;
  }
  .bottom_button_container {
    position: fixed;
    right: 1.2rem;
    bottom: 0px;
    z-index: 10;
    transform: translateY(-5rem);
    transition-duration: 0.25s, 0.25s;
    transition-timing-function: cubic-bezier(0.75, 0.25, 0.25, 0.75),
      cubic-bezier(0.75, 0.25, 0.25, 0.75);
    transition-delay: initial, initial;
    transition-property: transform, transform;
  }

  @media screen and (max-width: 1007px) {
    width: 48%;
    height: 2rem;
    font-size: 0.8rem;
  }
  @media screen and (max-width: 638px) {
    width: 48%;
    height: 2rem;
    font-size: 0.8rem;
  }
`;

function DayButton({ children, ...rest }) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}

export default DayButton;
