import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { changeField } from "../../../module/posting";
import placelogo from "../../../resource/img/placelogo2.png";
import Button from "../buttons/DayButton";
import { FormControl, TextField, NativeSelect } from "@mui/material";

const PRPlaceBoxTemplate = styled.div`
  width: auto;
  margin: 15px;
  background-color: white;

  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);

  padding: 1.1rem;
  border-width: 0px;
  border-style: solid;
  border-bottom-left-radius: 0.4rem;
  border-bottom-right-radius: 0.4rem;
  overflow-x: hidden;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;

  .logo {
    width: 100px;
    height: auto;
    margin-left: -13px;
    margin-bottom: 10px;
  }

  .button {
    width: 60%;
    margin-top: 15px;
    padding-left: 20%;
    padding-right: 20%;
  }

  @media screen and (max-width: 612px) {
    .button {
      width: 70%;
      margin-top: 15px;
      padding-left: 15%;
      padding-right: 15%;
    }
  }
  @media screen and (min-width: 1012px) {
    .button {
      width: 30%;
      margin-top: 15px;
      padding-left: 35%;
      padding-right: 35%;
    }
  }
`;

const PRPlaceBoxTitle = styled.div`
  text-align: left;
  margin-top: 1rem;
  margin-left: 0.5rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
  font-size: 0.9rem;
  width: 100%;
`;

const PostInput = styled.div`
  margin-left: 0.5rem;
  margin-right: 0.5rem;
`;

const PlaceRemoveBtn = styled.div`
  width: 100%;
  text-align: center;
`;

const PRPlaceBoxText = styled.div``;

const PRPlaceBoxImage = styled.div``;

export default function PRPlaceBox({ did, pid, data = {} }) {
  // 스테이트 형식
  // let data = {
  //   name: "",
  //   loc: "",
  //   cost: "",
  //   img: "",
  //   content: "",
  //   trans: "",
  // };

  return (
    <PRPlaceBoxTemplate>
      <img className="logo" src={placelogo} />
      <PRPlaceBoxTitle>이름</PRPlaceBoxTitle>
      {/* 이름 출력 */}
      <PRPlaceBoxText>{data.name}</PRPlaceBoxText>

      <PRPlaceBoxTitle>위치</PRPlaceBoxTitle>
      {/* 위치 출력 */}
      <PRPlaceBoxText>{data.loc}</PRPlaceBoxText>

      <PRPlaceBoxTitle>비용</PRPlaceBoxTitle>
      {/* 비용 출력 */}
      <PRPlaceBoxText>{data.cost}</PRPlaceBoxText>

      <PRPlaceBoxTitle>사진</PRPlaceBoxTitle>
      {/* 이미지 출력 */}
      <PRPlaceBoxImage>
        <img src={data.img /* 이미지 주소 */}></img>
      </PRPlaceBoxImage>

      <PRPlaceBoxTitle>내용</PRPlaceBoxTitle>
      {/* 내용 출력 */}
      <PRPlaceBoxText>{data.content}</PRPlaceBoxText>

      <PRPlaceBoxTitle>이동수단</PRPlaceBoxTitle>
      <PRPlaceBoxText>{data.trans}</PRPlaceBoxText>
    </PRPlaceBoxTemplate>
  );
}
