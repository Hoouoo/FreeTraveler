import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import palette from "../../lib/styles/palette";
import ftlogo from "../../resource/img/ftlogo.png";
import { useHistory } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";

/**
 * 회원가입 또는 로그인 페이지의 레이아웃을 담당하는 컴포넌트입니다.
 */

/*화면 전체를 채움*/
const ContentTemplateBlock = styled.div`
  position: static;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;

  height: 80%;
  padding-top: 52px;

  background: ${palette.gray[2]};

  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  justify-content: center;
`;

const WhiteBox = styled.div`
  .logo-area {
    display: block;
    padding-bottom: 2rem;
    text-align: center;
    font-weight: bold;
    letter-spacing: 2px;
  }

  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  padding: 2rem;
  height: 85%;
  width: 80%;
  background: white;
  border-radius: 8px;

  @media screen and (max-width: 768px) {
    .logo-area {
      display: block;
      padding-bottom: 2rem;
      text-align: center;
      font-weight: bold;
      letter-spacing: 2px;
    }
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
    padding: 2rem;
    width: 80%;
    background: white;
    border-radius: 8px;
  }
`;
const LogoStyled = styled.div`
  .logo__center {
    height: 30px;
  }

  .logo {
    margin: 0 1rem;
    font-size: 2rem;
    text-align: center;
  }
`;

const ContentTemplate = ({ children }) => {
  const history = useHistory();
  return (
    <ContentTemplateBlock>
      <WhiteBox>{children}</WhiteBox>
    </ContentTemplateBlock>
  );
};

export default ContentTemplate;
