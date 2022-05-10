import React, { useEffect, useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { changeField } from "../../module/posting";
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

  const dispatch = useDispatch();

  //인풋 변경 이벤트 핸들러
  const onChange = (e) => {
    console.log("hi");
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: "wpost",
        key: name,
        value,
      })
    );
  };

  const OABox = (
    <PWOABox>
      <PWForm>
        <PostInput
          type="text"
          name="wname"
          placeholder="포스트 제목"
          onChange={onChange}
        />
        <br />
        <PostInput
          name="wcost"
          type="text"
          placeholder="여행 비용"
          onChange={onChange}
        />{" "}
        <br />
        <PostInput
          name="wdays"
          type="text"
          placeholder="여행 일수"
          onChange={onChange}
        />{" "}
        <br />
        <PostInput
          name="wtrans"
          type="text"
          placeholder="여행 방법"
          onChange={onChange}
        />{" "}
        <br />
        <PostInput
          name
          wcommenttype="text"
          placeholder="경험자의 한마디"
          onChange={onChange}
        />{" "}
        <br />
      </PWForm>
    </PWOABox>
  );

  const dayAddAction = function () {
    gen.addBox({ id: dayIndex, day: dayIndex + 1 });
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

  // 폼 등록 이벤트 핸들러
  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      {OABox}
      <DayAddBtn onClick={() => dayAddAction()}>하루 추가</DayAddBtn>
      <DayRemoveBtn onClick={() => dayRemoveAction()}>하루 삭제</DayRemoveBtn>
      <br />
      <PWForm method="post" onSubmit={onSubmit}>
        {days}
        <PostInput type="submit" />
        <br />
      </PWForm>
    </div>
  );
}
