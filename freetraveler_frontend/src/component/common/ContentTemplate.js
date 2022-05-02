import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import palette from "../../lib/styles/palette";
import ftlogo from "../../resource/img/ftlogo.png";
import { useHistory } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";

/**
 * 헤더와 탭바와 안겹치게 화면을 렌더링합니다.
 */

const HeaderEmpty = styled.div`
  width: 100%;
  height: 52px;
`;

const TabbarEmtpy = styled.div`
  width: 100%;
  height: 60px;
`;

const ContentTemplateBlock = styled.div`
  padding-top: 62px;
  padding-bottom: 41px;
  height: 100%;
  width: 100%;

  background: ${palette.gray[0]};
`;

const ContentTemplate = ({ children }) => {
  const history = useHistory();
  return (
    <>
      <ContentTemplateBlock>{children}</ContentTemplateBlock>;
    </>
  );
};

export default ContentTemplate;
