import React, { useEffect, useReducer, useState } from "react";
import styled from "styled-components";
import PWDayBoxGenerator from "./generator/PWDayBoxGenerator";
import PostTemplate from "./PostTemplate";
import palette from "../../lib/styles/palette";
import PostButton from "./buttons/PostButton";
import { Link } from "react-scroll";

const PWOABox = styled.div`
  width: auto;
  height: 100%;
  padding: 35px;
  margin-top: -10px;
  margin-left: 10%;
  margin-right: 10%;
  background-color: white;
`;

const PWDayBox = styled.div``;

const PWForm = styled.form`
  width: auto;
  height: 100%;
  padding: 50px;
  text-align: center;
`;

const ScrollBar = styled.div`
  justify-content: center;
  align-items: flex-end;
  align-content: center;
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
`;

const PostInput = styled.input`
  font-size: 15px;
  margin: 5px;
  width: 100%;
  margin-left: 0.5rem;
  margin-bottom: 1rem;
`;

const TitleInput = styled.input`
  outline: none;
  border: none;
  font-size: 2rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${palette.gray[4]};
  margin-bottom: 1rem;
  width: 100%;
`;

const PostObjectTitle = styled.div`
  text-align: left;
  margin-left: 0.5rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
  font-size: 1rem;
  width: 100%;
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
        <TitleInput type="text" placeholder="포스트 제목" />
        <PostObjectTitle> 여행 비용 </PostObjectTitle>
        <PostInput type="text" placeholder="여행 비용" />
        <PostObjectTitle> 여행 일수 </PostObjectTitle>
        <PostInput type="text" placeholder="여행 일수" />
        <PostObjectTitle> 여행 방법 </PostObjectTitle>
        <PostInput type="text" placeholder="여행 방법" />
        <PostObjectTitle> 경험자의 한마디 </PostObjectTitle>
        <PostInput type="text" placeholder="경험자의 한마디" />
      </PWForm>
    </PWOABox>
  );

  const dayRender = () => {
    const dayInputIndex = [];
    for (let i = 1; i <= dayIndex; i++) {
      dayInputIndex.push(
        <Link to={i-1} spy={true} smooth={true}>
          <span key={i}>{i + "일차"}</span>
          <br />
        </Link>
      );
    }
    return dayInputIndex;
  };

  const DBox = <ScrollBar>{dayRender()}</ScrollBar>;

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
      {DBox}
      {days}
    </div>
  );
}
