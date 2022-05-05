import React, { useEffect, useReducer, useState } from "react";
import styled from "styled-components";
import PWDayBoxGenerator from "./generator/PWDayBoxGenerator";
import PostTemplate from "./PostTemplate";

const PWOABox = styled.div``;

const PWDayBox = styled.div``;

const PWForm = styled.form`
  width: auto;
  height: 100%;
  padding: 50px;
  text-align: center;
`;

const PostInput = styled.input`
  font-size: 15px;
  margin: 5px;
`;

const DayAddBtn = styled.button`
  width: 150px;
`;

const DayRemoveBtn = styled.button`
  width: 150px;
`;

export default function PostWriteForm({ id }) {
  var [gen, setGen] = useState(new PWDayBoxGenerator());
  var [days, setDays] = useState(gen.render());
  var [dayIndex, setDayIndex] = useState(0);

  const OABox = (
    <PWOABox>
      <PWForm>
        <PostInput type="text" placeholder="포스트 제목" /> <br />
        <PostInput type="text" placeholder="여행 비용" /> <br />
        <PostInput type="text" placeholder="여행 일수" /> <br />
        <PostInput type="text" placeholder="여행 방법" /> <br />
        <PostInput type="text" placeholder="경험자의 한마디" /> <br />
      </PWForm>
    </PWOABox>
  );

  const dayAddAction = function () {
    gen.addBox({ id: dayIndex, day: dayIndex + 1, cost: "1" });
    setDayIndex(++dayIndex);
    setDays(gen.render());
  };

  const dayRemoveAction = function () {
    if (dayIndex >= 0) {
      gen.removeTop();
      setDayIndex(--dayIndex);
      setDays(gen.render());
    }
  };

  return (
    <div>
      {OABox}
      <DayAddBtn onClick={() => dayAddAction()}>하루 추가</DayAddBtn>
      <DayRemoveBtn onClick={() => dayRemoveAction()}>하루 삭제</DayRemoveBtn>
      <br />
      {days}
    </div>
  );
}
