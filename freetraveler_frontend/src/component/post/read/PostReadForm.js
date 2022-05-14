import { style } from "@mui/system";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PostTemplate from "../PostTemplate";
import PRDayBoxGenerator from "./generator/PRDayBoxGenerator";
import { VscAccount } from "react-icons/vsc";
import palette from "../../../lib/styles/palette";

const PRForm = styled.form`
  width: auto;
  height: 100%;
  padding-left: 100px;
  padding-right: 100px;
  padding-bottom: 5%;
  margin-top: -10px;
  margin-left: 10%;
  margin-right: 10%;
  background-color: white;
  @media screen and (max-width: 612px) {
    margin-left: -10px;
    margin-right: 0px;
    padding: 20px;
  }
`;
const ImgForm = styled.div`
  .image-box {
    width: 100%;
    height: 220px;
    overflow: hidden;
    margin: 0 auto;
  }

  .image-inbox {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const MapBoxForm = styled.div`
  border-radius: 10px;
  width: 100%;
  height: 500px;
  margin-top: 2rem;
  margin-bottom: 2rem;
  background-color: black;
  box-shadow: 0 0 5px ${palette.gray[12]};
`;
const MapForm = styled.div`
  border-radius: 10px;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
`;
const CommentBox = styled.div`
  display: block;
  outline: none;
  border-width: 1.5px;
  border-style: solid;
  border-radius: 10px;
  color: white;
  font-weight: bold;
  width: 100%;
  border-color: ${palette.mint[0]};
`;
const TotalText = styled.div`
  margin-left: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  width: 100%;
`;

const TitleObjectText = styled.div`
  margin: 0 0 -5px 0;
  text-align: left;
  font-size: 14px;
  line-height: 30px;
  align-content: center;
`;

const TitleLogo = styled.div`
  float: left;
  margin-right: 15px;
  margin-top: 0.5px;
`;

const TextLine = styled.div`
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #aaa;
  line-height: 0.1em;
  margin: 15px 0 20px;
`;

const TitleText = styled.div`
  font-size: 2rem;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
  margin-top: 1.8rem;
  margin-left: 0.5rem;
  width: 100%;
`;

const TotalTextInfo = styled.div`
  margin: 10px;
  font-size: 1.2rem;
  font-weight: 400;
  color: rgb(26, 26, 26);
  text-align: left;
`;

const MapMarker = styled.div`
  background-color: white;
  padding: 15px;
`;

const { kakao } = window;

const PostInput = styled.input``;

export default function PostReadForm({ id }) {
  var [gen, setGen] = useState(new PRDayBoxGenerator());
  var [days, setDays] = useState(gen.render());
  var [dayIndex, setDayIndex] = useState(0);
  var [init, setInit] = useState(false);

  const data = {
    id: "1",
    author: "작성자",
    time: "2021-04-24",
    repimg:
      "https://file.mk.co.kr/meet/neds/2022/05/image_readtop_2022_413241_16521705595037804.jpg",
    postName: "서울 여행",
    totalCost: "100만원",
    totalDays: "4",
    totalTrans: "대중교통",
    comment: "에버랜드 재밌어요!",
    good: 3, // 추천 수
    days: [
      [
        {
          placeName: "에버랜드",
          loc: "에버랜드 주소",
          loc_y: 37.2977,
          loc_x: 127.194794,
          cost: "72만원",
          img: "https://img.hankyung.com/photo/202011/AA.24246710.1.jpg",
          content: "와우와우와우! 티익스프레스 개꿀잼!",
          trans: "도보",
        },
        {
          placeName: "서대문 형무소",
          loc: "서대문형무소 주소",
          loc_y: 37.574756,
          loc_x: 126.95517,
          cost: "72만원",
          img: "https://img.hankyung.com/photo/202011/AA.24246710.1.jpg",
          content: "와우와우와우! 오늘도 개꿀잼!",
          trans: "도보",
        },
      ],
      [
        {
          placeName: "종묘",
          loc: "종묘 주소",
          loc_y: 37.575919,
          loc_x: 126.993556,
          cost: "72만원",
          img: "https://img.hankyung.com/photo/202011/AA.24246710.1.jpg",
          content: "와우와우와우! 내일도 개꿀잼!",
          trans: "도보",
        },
        {
          placeName: "숭례문",
          loc: "숭례문 주소",
          loc_y: 37.559737,
          loc_x: 126.974936,
          cost: "72만원",
          img: "https://img.hankyung.com/photo/202011/AA.24246710.1.jpg",
          content: "와우와우와우! 그냥 개꿀잼!",
          trans: "도보",
        },
      ],
    ],
  };

  //처음 실행될 때 한번만 실행
  if (init == false) {
    //daybox 생성
    for (var i = 0; i < data.days.length; i++) {
      gen.addBox({ id: dayIndex, day: dayIndex + 1, gen, data: data.days[i] });
      setDayIndex(++dayIndex);
      setDays(gen.render());
    }
    setInit(true);
  }

  useEffect(() => {
    //제일 처음위치로 설정
    var loc_init_x = 126.974936;
    var loc_init_y = 37.559737;

    if (data.days[0][0] != null) {
      loc_init_x = data.days[0][0].loc_x;
      loc_init_y = data.days[0][0].loc_y;
    }

    var mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(loc_init_y, loc_init_x), // 지도의 중심좌표
        level: 12, // 지도의 확대 레벨
      };

    // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
    var map = new kakao.maps.Map(mapContainer, mapOption);

    // 커스텀 오버레이에 표시할 내용입니다
    // HTML 문자열 또는 Dom Element 입니다
    for (var i = 0; i < data.days.length; i++) {
      for (var j = 0; j < data.days[i].length; j++) {
        var tempData = data.days[i][j];
        var content =
          '<div class=".map_marker_wrapper">' +
          '<div class="map_marker">' +
          (i + 1) +
          "Day " +
          (j + 1) +
          (j + 1 == 1 ? "st" : j + 1 == 2 ? "nd" : j + 1 == 3 ? "rd" : "th") +
          " " +
          tempData.placeName +
          "</div>" +
          '<div class="triangle"/></div>';

        // 커스텀 오버레이가 표시될 위치입니다
        var position = new kakao.maps.LatLng(tempData.loc_y, tempData.loc_x);

        // 커스텀 오버레이를 생성합니다
        var customOverlay = new kakao.maps.CustomOverlay({
          position: position,
          content: content,
        });

        // 커스텀 오버레이를 지도에 표시합니다
        customOverlay.setMap(map);
      }
    }

    console.log("loading kakaomap");

    //지도 마커 표시
  }, []);

  return (
    <>
      <PRForm>
        <ImgForm>
          <div className="image-box">
            <img className="image-inbox" src={data.repimg} />
          </div>
        </ImgForm>
        <TitleText>{data.postName}</TitleText> <br />
        <TitleObjectText>
          <TotalText>
            <TitleLogo>
              <VscAccount size="30" color="#000" />
            </TitleLogo>
            <b>{data.author}</b> &nbsp;&nbsp;&nbsp;{data.time}
          </TotalText>
        </TitleObjectText>
        <TextLine />
        <TotalTextInfo>
          <b>일수 | </b>
          {data.totalDays}일
        </TotalTextInfo>
        <br />
        <TotalTextInfo>
          <b>비용 | </b>
          {data.totalCost}
        </TotalTextInfo>
        <br />
        <TotalTextInfo>
          <b>방법 | </b>
          {data.totalTrans}
        </TotalTextInfo>
        <br />
        <CommentBox>
          <TotalTextInfo>{data.comment}</TotalTextInfo>
        </CommentBox>
        {/* 여기가 지도 넣을 곳 */}
        <MapBoxForm>
          <MapForm id="map"></MapForm>
        </MapBoxForm>
        {/* 여기가 지도 넣을 곳 */}
        {days}
      </PRForm>
    </>
  );
}
