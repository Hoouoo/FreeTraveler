import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { changeField } from "../../../module/posting";
import placelogo from "../../../resource/img/placelogo2.png";
import Button from "../buttons/DayButton";
import { FormControl, TextField, NativeSelect } from "@mui/material";
import palette from "../../../lib/styles/palette";

const PRPlaceBoxTemplate = styled.div`
  /* width: auto; */
  /* margin: 15px; */
  margin-top: 15px;
  margin-bottom: 30px;
  background-color: white;

  box-shadow: 0 0 5px ${palette.gray[12]};

  padding: 1.1rem;
  border-width: 0px;
  border-style: solid;
  border-radius: 0.4rem;
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
  margin-top: 1rem;
  /* margin-left: 1rem; */
  font-size: 1.2rem;
  font-weight: 400;
  color: rgb(26, 26, 26);
  text-align: left;
`;

const PostInput = styled.div`
  margin: 10px;
  font-size: 1.2rem;
  font-weight: 400;
  color: rgb(26, 26, 26);
  text-align: left;
`;

const PlaceRemoveBtn = styled.div`
  width: 100%;
  text-align: center;
`;

const PRPlaceBoxText = styled.div``;

const PRPlaceBoxImage = styled.div`
  .image-box {
    width: 100%;
    height: 300px;
    overflow: hidden;
    margin: 0 auto;
  }

  .image-inbox {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const CommentBox = styled.div`
  margin-top: 1rem;
  display: inline-flex;
  outline: none;
  border-width: 1.5px;
  border-style: solid;
  border-radius: 10px;
  color: white;
  font-weight: bold;
  /* padding: 0.9rem; */
  width: 100%;
  /* 색상 */
  border-color: ${palette.mint[0]};
`;

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
      {/* 이미지 출력 */}
      <PRPlaceBoxImage>
        <div className="image-box">
          <img className="image-inbox" src={data.img /* 이미지 주소 */}></img>
        </div>
      </PRPlaceBoxImage>

      {/* 이름 출력 */}
      <PRPlaceBoxTitle>
        <b>장소 | </b>
        {data.placeName}
      </PRPlaceBoxTitle>
      {/* 위치 출력 */}
      <PRPlaceBoxTitle>
        <b>위치 | </b>
        {data.loc}
      </PRPlaceBoxTitle>

      {/* 비용 출력 */}
      <PRPlaceBoxTitle>
        <b>비용 | </b>
        {data.cost}
      </PRPlaceBoxTitle>

      {/* 이동 수단 출력 */}
      <PRPlaceBoxTitle>
        <b>이동수단 | </b>
        {data.trans}
      </PRPlaceBoxTitle>

      {/* 내용 출력 */}
      <CommentBox>
        <PostInput>{data.content}</PostInput>
      </CommentBox>
    </PRPlaceBoxTemplate>
  );
}
