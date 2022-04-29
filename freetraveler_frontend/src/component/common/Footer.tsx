import React from "react";
import styled from "styled-components";
import footerlogo from "../../resource/img/footerlogo.png";

const FooterStyled = styled.div`

  padding-bottom: 56px;

  .footer__center {
    padding: 10px 0;
    font-size: 9px;
    background-color: #f1f1f1;
    text-align: center;
    color: #888;
  }
  .footer__left {
    padding: 10px 0;
    border-top: 1px solid #d9d9d9;
    font-size: 12px;
    background-color: #f1f1f1;
    text-align: left;
    color: #6b6b6b;
  }
  .txt__left {
    padding-left: 0.5em;
  }
  .logo {
    width: auto;
    height: 18px;
  }
`;

function Footer() {
  return (
    <FooterStyled>
      <div className="footer__left">
        <img className="logo" src={footerlogo} />
        <br />
        <div className="txt__left">
          내가 가고싶은 곳이 재조명 받는다면? free-traveler (이거는 나중에
          원하는 멘트로 변경해야함.)
        </div>
      </div>
      <div className="footer__center"> Copyright©Capstone-Longstone. </div>
    </FooterStyled>
  );
}

export default Footer;
