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
const AuthTemplateBlock = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: ${palette.gray[2]};

  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
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
  height: 100%;
  width: 700px;
  background: white;
  border-radius: 2px;

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
    width: 280px;
    background: white;
    border-radius: 2px;
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

const AuthTemplate = ({ children }) => {
  const history = useHistory();
  return (
    <AuthTemplateBlock>
      <WhiteBox>
        <IoChevronBack
          size="20"
          color="#000"
          onClick={() => {
            history.goBack();
          }}
        />
        <LogoStyled>
          <div className="logo">
            <Link to="/">
              <img className="logo__center" src={ftlogo} />
            </Link>
          </div>
        </LogoStyled>
        {children}
      </WhiteBox>
    </AuthTemplateBlock>
  );
};

export default AuthTemplate;
