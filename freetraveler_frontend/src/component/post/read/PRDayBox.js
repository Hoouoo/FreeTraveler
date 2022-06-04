import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PostButton from "../buttons/PostButton";
import { IoIosAddCircleOutline } from "react-icons/io";
import PRDayBoxGenerator from "./generator/PRDayBoxGenerator";
import PRPlaceBoxGenerator from "./generator/PRPlaceBoxGenerator";

const PRDayBoxTemplate = styled.div`
  /* width: auto;
  height: auto;
  margin: 50px;
  background-color: lightgreen;
  list-style: none;
  padding-top: 0px;
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  overflow-x: hidden;
  overflow-y: hidden; */
  /* margin: 50px; */
  /* width: 100%; */
  margin-left: -40px;
  /* margin-bottom: 20px; */
  /* min-height: 90vh; */
  /* background-color: rgb(255, 255, 255); */

  /* padding-top: 4rem;
  padding-left: -1rem;
  padding-left: -1rem; */
  /* padding-bottom: 1.2rem; */
  /* border-width: 0.1px; */
  /* border-style: solid; */
  /* border-color: rgb(230, 230, 230); */
  /* border-top-width: 0.1px;
  border-radius: 0.2rem;
  overflow-x: hidden;
  overflow-y: hidden;
  display: flex;
  flex-direction: column; */
  /* @supports (-webkit-touch-callout: none) {
    min-width: -webkit-fill-available;
  } */
  width: auto;
  /* min-height: 90vh; */
  /* height: auto;
  padding: 35px;
  margin-top: -10px;
  margin-left: 10%;
  margin-right: 10%;
  background-color: white;
  justify-content: center;
  align-items: center; */
  /* @media screen and (max-width: 650px) {
    margin-left: 10%;
    margin-right: 10%;
  } */
  /* @media screen and (min-width: 650px) {
    display: flex;
  } */
  /* @media screen and (max-width: 612px) {
    margin-left: -40px;
    margin-right: -10px;
    padding-left: 0.1rem;
    padding-right: 0.1rem;
    padding-bottom: 0.1rem;
  } */
`;

const DayTitleLine = styled.div`
  justify-content: space-between;
`;

const DayTitle = styled.div`
  /* padding-left: 1rem; */
  float: left;
  font-size: 1.3rem;
  font-weight: 700;
  line-height: 1.9rem;
  color: rgb(26, 26, 26);
`;

const PRForm = styled.form`
  width: auto;
  height: 100%;
  padding: 25px;
  text-align: center;
`;

const PostInput = styled.input`
  font-size: 15px;
  margin: 5px;
`;

export default function PRDayBox({ id, day, pgen, data, lines }) {
  var [places, setPlaces] = useState();
  var [gen, setGen] = useState(new PRPlaceBoxGenerator(places, setPlaces));
  var [init, setInit] = useState(false);

  //초기 한번만 실행
  if (init == false) {
    //상위 제너레이터(daybox)에 현재 제너레이터(placebox)전달 및 추가
    pgen._genArray.push(gen);
    //받은 데이터로 placebox 생성
    gen.addBox({ did: id, data: data[0], line: null });
    for (var i = 1; i < data.length; i++) {
      gen.addBox({ did: id, data: data[i], line: lines[i - 1] });
    }
    setPlaces(gen.render());
    setInit(true);
  }

  return (
    <div id={day}>
      {/* <button onClick={() => gen.getData()}>함 보여바라!</button> */}
      <PRDayBoxTemplate>
        <DayTitleLine>
          <DayTitle>{day} DAY</DayTitle>
        </DayTitleLine>
        <br />
        <br />
        {places}
      </PRDayBoxTemplate>
    </div>
  );
}
