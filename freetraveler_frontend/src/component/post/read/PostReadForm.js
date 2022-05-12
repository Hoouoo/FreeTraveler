import { style } from "@mui/system";
import React, { useState } from "react";
import styled from "styled-components";
import PostTemplate from "../PostTemplate";
import PRDayBoxGenerator from "./generator/PRDayBoxGenerator";

const PRForm = styled.form`
  width: auto;
  height: 100%;
`;

const TotalText = styled.div`
  font-weight: bold;
`;
const TotalTextInfo = styled.div``;

const PostInput = styled.input``;

export default function PostReadForm({ id }) {
  var [gen, setGen] = useState(new PRDayBoxGenerator());
  var [days, setDays] = useState(gen.render());
  var [dayIndex, setDayIndex] = useState(0);

  var [init, setInit] = useState(false);

  if (!init) {
    gen.addBox({ id: dayIndex, day: dayIndex + 1, gen });
    setDayIndex(++dayIndex);
    setDays(gen.render());
    setInit(true);
  }

  return (
    <PRForm>
      <TotalText>작성자</TotalText> <br />
      <TotalTextInfo></TotalTextInfo> <br />
      <TotalText>작성시간</TotalText> <br />
      <TotalTextInfo></TotalTextInfo> <br />
      <TotalText>제목</TotalText> <br />
      <TotalTextInfo></TotalTextInfo> <br />
      <TotalText>비용</TotalText> <br />
      <TotalTextInfo></TotalTextInfo> <br />
      <TotalText>일수</TotalText> <br />
      <TotalTextInfo></TotalTextInfo> <br />
      <TotalText>방법</TotalText> <br />
      <TotalTextInfo></TotalTextInfo> <br />
      <TotalText>경험자 한마디</TotalText> <br />
      {days}
    </PRForm>
  );
}
