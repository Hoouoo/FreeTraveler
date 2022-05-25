import { style } from "@mui/system";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PostTemplate from "../PostTemplate";
import PRDayBoxGenerator from "./generator/PRDayBoxGenerator";
import { VscAccount } from "react-icons/vsc";
import palette from "../../../lib/styles/palette";
import { red } from "@mui/material/colors";
import { dom } from "@fortawesome/fontawesome-svg-core";
import hardSet from "redux-persist/es/stateReconciler/hardSet";
import { useDispatch, useSelector } from "react-redux";
import { getPost, loadModBuffer } from "../../../module/posting";
import { useHistory } from "react-router-dom";
import qs from "qs";
import { removePost } from "../../../module/posting";
import { IoMdMore } from "react-icons/io";

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
  font-weight: 740;
  font-size: 2rem;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
  margin-top: 1.8rem;
  margin-left: 0.5rem;
  width: 100%;
`;

const TotalTextInfo = styled.div`
  margin: 10px;
  font-size: 1rem;
  font-weight: 500;
  color: rgb(26, 26, 26);
  text-align: left;
`;

const MapMarker = styled.div`
  background-color: white;
  padding: 15px;
`;

const DayButtonForm = styled.div`
  height: auto;
  border: solid 2px;
  border-color: ${palette.mint[0]};
  padding: 0.5rem;
  border-radius: 0.4rem;
`;

const DayButton = styled.div`
  display: inline-block;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  margin: 0.2rem;
  border-radius: 0.2rem;
  color: black;
  cursor: pointer;
`;

const ModifyButton = styled.div`
  float: right;
  display: inline;
  cursor: pointer;
  /* padding: 10px; */
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 5px;

  /* border: 1px solid ${palette.gray[13]}; */
  &:hover {
    background: ${palette.gray[6]};
    color: white;
  }
  &:active {
    background: ${palette.gray[6]};
    color: white;
  }

  color: black;
  background-color: white;

  font-size: 12px;
  font-weight: 700;
`;

const DeleteButton = styled.div`
  float: right;
  display: inline;
  cursor: pointer;
  /* padding: 3px; */
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 5px;
  margin-left: 3px;
  margin-right: 10px;

  /* border: 1px solid ${palette.gray[13]}; */
  color: black;
  background-color: white;

  font-size: 12px;
  font-weight: 700;

  &:hover {
    background: ${palette.gray[6]};
    color: white;
  }
  &:active {
    background: ${palette.gray[6]};
    color: white;
  }
`;

const MenuBar = styled.div`
  float: right;
  margin-right: 10px;

  .menubar-box {
    background-color: white;
    border-radius: 4px;
    border: 1px solid ${palette.gray[14]};
    box-shadow: 1px 2px 2px 0px ${palette.gray[12]};
  }
  .menubar-border-bottom {
    border-bottom: 0.3px solid ${palette.gray[14]};
  }
  .menubar {
    border: none;
    border: 0px;
    margin: 0px;
    padding: 0px;
    font-size: 14px;
    font-weight: bold;
  }

  .menubar ul {
    /* background: white; */
    height: 50px;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .menubar li {
    list-style: none;
    float: right;
    padding: 0px;
  }

  .menubar li a {
    background: white;
    color: black;
    display: block;
    font-weight: normal;
    line-height: 50px;
    margin: 0px;
    text-align: center;
    text-decoration: none;
  }

  /* .menubar li a:hover, */
  /* .menubar ul li:hover a { */
  /* border: 0.3px solid black; */
  /* background: ${palette.gray[6]};
    color: ${palette.gray[0]}; */
  /* text-decoration: none; */
  /* } */

  .menubar li ul {
    /* background: ${palette.gray[6]}; */
    /* border-radius: 10px; */
    /* border: 0.3px solid black; */
    display: none; /* 평상시에는 드랍메뉴가 안보이게 하기 */
    height: auto;
    padding: 0px;
    margin-left: -90px;
    border: 0px;
    position: absolute;
    width: 130px;
    z-index: 200;
    /*top:1em;
/*left:0;*/
  }
  .menubar-dark-text {
    font-size: 14px;
    font-weight: 300;
    color: ${palette.gray[10]};
    /* text-align: left;
    margin-left: 5px; */
  }
  .menubar-red-text {
    font-size: 14px;
    font-weight: 300;
    color: red;
  }

  @media screen and (max-width: 612px) {
    .menubar li ul {
      margin-left: -100px;
    }
  }
  .menubar li:active ul {
    display: block; /* 마우스 커서 올리면 드랍메뉴 보이게 하기 */
  }

  .menubar li:focus ul {
    display: block; /* 마우스 커서 올리면 드랍메뉴 보이게 하기 */
  }

  .menubar li li {
    /* background: ${palette.gray[6]}; */
    display: block;
    float: none;
    margin: 0px;
    padding: 0px;
    width: 130px;
  }

  .menubar li:hover li a {
    background: none;
  }

  .menubar li ul a {
    /* border-radius: 10px; */
    width: 100%;
    display: block;
    height: 50px;
    font-size: 12px;
    font-style: normal;
    /* margin: 0px; */
    margin-right: 100px;
    /* text-align: right; */
  }

  /* 클릭 시  */
  .menubar li ul a:active,
  .menubar li ul li:active a {
    cursor: pointer;
    width: 100%;
    /* background: ${palette.gray[13]}; */
    border: 0px;
    /* color: ${palette.gray[0]}; */
    text-decoration: none;
  }

  .menubar p {
    clear: left;
  }
`;

const { kakao } = window;

const PostInput = styled.input``;

export default function PostReadForm({ id }) {
  var [gen, setGen] = useState(new PRDayBoxGenerator());
  var [days, setDays] = useState(gen.render());
  var [dayIndex, setDayIndex] = useState([]);
  var [buttons, setButtons] = useState([]);
  var [markers, setMarkers] = useState([]);
  var [lines, setLines] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();
  // const { data } = useSelector(({ post }) => {
  //   data: post.postRead;
  // });

  //카카오 맵
  var map;

  const data = {
    id: "1",
    author: "이상훈",
    time: "2021-04-24",
    repImg:
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
          trans: "walk",
        },
        {
          placeName: "서대문 형무소",
          loc: "서대문형무소 주소",
          loc_y: 37.574756,
          loc_x: 126.95517,
          cost: "72만원",
          img: "https://img.hankyung.com/photo/202011/AA.24246710.1.jpg",
          content: "와우와우와우! 오늘도 개꿀잼!",
          trans: "walk",
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
          trans: "walk",
        },
        {
          placeName: "숭례문",
          loc: "숭례문 주소",
          loc_y: 37.559737,
          loc_x: 126.974936,
          cost: "72만원",
          img: "https://img.hankyung.com/photo/202011/AA.24246710.1.jpg",
          content: "와우와우와우! 그냥 개꿀잼!",
          trans: "walk",
        },
        {
          placeName: "서해",
          loc: "서해 주소",
          loc_y: 35.549737,
          loc_x: 125.984936,
          cost: "72만원",
          img: "https://img.hankyung.com/photo/202011/AA.24246710.1.jpg",
          content: "와우와우와우! 그냥 개꿀잼!",
          trans: "car",
        },
      ],
    ],
  };

  const getData = function () {
    const query = qs.parse(history.location.search, {
      ignoreQueryPrefix: true, // 물음표를 제거하고 받아오기 위해서
    });

    const id = query.id;

    var request = { params: { id: id } };
    dispatch(getPost(request));
  };

  const createMap = function () {
    //기본좌표 설정
    var loc_init_x = 126.974936;
    var loc_init_y = 37.559737;

    //가장 처음 장소를 기본 좌표로 설정
    if (data.days[0][0] != null) {
      loc_init_x = data.days[0][0].loc_x;
      loc_init_y = data.days[0][0].loc_y;
    }

    var mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(loc_init_y, loc_init_x), // 지도의 중심좌표
        level: 11, // 지도의 확대 레벨
      };

    // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
    map = new kakao.maps.Map(mapContainer, mapOption);
  };

  const createCustomOverlay = function () {
    // 커스텀 오버레이에 표시할 내용입니다
    for (var i = 0; i < data.days.length; i++) {
      markers.push([]);
      setMarkers(markers);
      for (var j = 0; j < data.days[i].length; j++) {
        var tempData = data.days[i][j];
        var content =
          '<div class=".map_marker_wrapper">' +
          '<div class="map_marker">' +
          (i + 1) +
          "일차 " +
          (j + 1) +
          "번장소" +
          // (j + 1 == 1 ? "st" : j + 1 == 2 ? "nd" : j + 1 == 3 ? "rd" : "th") +
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
          yAnchor: 1.5,
        });

        // 커스텀 오버레이를 지도에 표시합니다
        customOverlay.setMap(map);

        markers[i].push(customOverlay);
        setMarkers(markers);
      }
    }
  };

  const createLine = function () {
    //지도에 선긋기
    for (var i = 0; i < data.days.length; i++) {
      lines.push([]);
      setLines(lines);
      for (var j = 0; j < data.days[i].length - 1; j++) {
        //선 정보
        var fullLine = new kakao.maps.Polyline({
          map: map, // 선을 표시할 지도입니다
          strokeWeight: 5, // 선의 두께입니다
          strokeColor: palette.line[i % palette.line.length], // 선의 색깔입니다
          strokeOpacity: 0.8, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
          strokeStyle: "solid", // 선의 스타일입니다
        });

        var now = data.days[i][j];
        var next = data.days[i][j + 1];

        var latlng1 = new kakao.maps.LatLng(now.loc_y, now.loc_x);
        var latlng2 = new kakao.maps.LatLng(next.loc_y, next.loc_x);

        fullLine.setPath([latlng1, latlng2]);
        fullLine.setMap(map);

        lines[i].push(fullLine);
        setLines(lines);
      }

      // //전날 제일 마지막과 다음날 가장 마지막을 잇는다.
      // if (i < data.days.length - 1) {
      //   if (data.days[i + 1][0] != null) {
      //     //선 정보
      //     var fullLine = new kakao.maps.Polyline({
      //       map: map, // 선을 표시할 지도입니다
      //       strokeWeight: 5, // 선의 두께입니다
      //       strokeColor: palette.line[i % palette.line.length], // 선의 색깔입니다
      //       strokeOpacity: 0.8, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
      //       strokeStyle: "solid", // 선의 스타일입니다
      //     });

      //     var now = data.days[i][data.days[i].length - 1];
      //     var next = data.days[i + 1][0];

      //     var latlng1 = new kakao.maps.LatLng(now.loc_y, now.loc_x);
      //     var latlng2 = new kakao.maps.LatLng(next.loc_y, next.loc_x);

      //     // fullLine.setPath([latlng1, latlng2]);
      //     // fullLine.setMap(map);

      //     lines[i].push(fullLine);
      //     setLines(lines);
      //   }
      // }
    }
  };

  const createDayButton = function () {
    buttons = [];

    //버튼을 생성합니다
    buttons.push(
      <DayButton key={"daybutton_0"} id={"daybutton_0"}>
        All Day
      </DayButton>
    );

    setButtons(buttons);

    //Day 버튼 추가
    let promise = new Promise((resolve, reject) => {
      for (var i = 1; i < data.days.length + 1; i++) {
        buttons.push(
          <DayButton key={"daybutton_" + i} id={"daybutton_" + i}>
            {i} Day
          </DayButton>
        );
      }
      resolve();
    })
      .then(() => {
        for (var i = 1; i < data.days.length + 1; i++) {
          //버튼에 색상 주기
          var domObj = document.getElementById("daybutton_" + i);
          domObj.style.backgroundColor = palette.line[i % palette.line.length];

          const colorRGB = domObj.style.backgroundColor
            .slice(4)
            .slice(0, -1)
            .split(",")
            .map((e) => parseInt(e));

          if (colorRGB[1] < 100) {
            domObj.style.color = "white";
          }
        }
      })
      .then(() => {
        //버튼에 지도 제어 액션 추가합니다
        //All Day 버튼 액션 삽입

        /* 액션 전달을 위한 중간 변수 */
        // 마커들 (커스텀 오버레이)
        const tempMarkders = markers;
        // 선들
        const tempLines = lines;
        //최대 인덱스들
        const imax = data.days.length;
        const jmax = function (i) {
          return data.days[i].length;
        };

        const tempButton = document.getElementById("daybutton_0");
        tempButton.addEventListener("click", () => {
          //모든 마커 복귀
          for (var i = 0; i < imax; i++) {
            for (var j = 0; j < jmax(i); j++) {
              tempMarkders[i][j].setMap(map);
            }
          }

          //모든 라인 복귀
          for (var i = 0; i < imax; i++) {
            for (var j = 0; j < jmax(i) - 1; j++) {
              tempLines[i][j].setMap(map);
            }
          }
        });

        // All Day를 제외한 버튼 액션 삽입
        for (var h = 0; h < data.days.length; h++) {
          // 버튼을 가져옵니다
          const tempButton = document.getElementById("daybutton_" + (h + 1));

          /* 액션 전달을 위한 중간 변수 */
          const tempData = data;
          // 마커들 (커스텀 오버레이)
          const tempMarkders = markers;
          // 선들
          const tempLines = lines;
          //최대 인덱스들
          const imax = data.days.length;

          const jmax = data.days[h].length;

          //동적 jmax 생성 함수
          const djmax = function (e) {
            return tempData.days[e].length;
          };

          //현재 버튼의 위치
          const index = h;

          //버튼 액션을 추가합니다
          tempButton.addEventListener("click", () => {
            //모든 마커 제거
            for (var i = 0; i < imax; i++) {
              for (var j = 0; j < djmax(i); j++) {
                tempMarkders[i][j].setMap(null);
              }
            }

            //모든 라인 제거
            for (var i = 0; i < imax; i++) {
              for (var j = 0; j < djmax(i) - 1; j++) {
                tempLines[i][j].setMap(null);
              }
            }

            //알맞은 day에 새로 생성
            for (var j = 0; j < jmax; j++) {
              tempMarkders[index][j].setMap(map);
            }

            //알맞는 라인 새로 생성
            for (var j = 0; j < jmax - 1; j++) {
              tempLines[index][j].setMap(map);
            }
          });
        }
      });
  };

  const createDayBox = function () {
    //daybox 생성합니다
    for (var i = 0; i < data.days.length; i++) {
      const tempLines = lines[i];
      gen.addBox({
        id: dayIndex,
        day: dayIndex + 1,
        gen,
        data: data.days[i],
        lines: tempLines,
      });
      setDayIndex(++dayIndex);
      setDays(gen.render());
    }
  };

  useEffect(() => {
    getData();
    createMap();
    createCustomOverlay();
    createLine();
    createDayButton();
    createDayBox();
  }, []);

  const linkToModify = function () {
    dispatch(loadModBuffer(data));
    history.push("/posting/modify");
  };

  const deleteBoard = function () {
    dispatch(removePost({ data: { id: data.id } }));
  };

  return (
    <>
      <PRForm>
        <ImgForm>
          <div className="image-box">
            <img className="image-inbox" src={data.repImg} />
          </div>
        </ImgForm>
        <TitleText>{data.postName}</TitleText> <br />
        <TitleObjectText>
          <TotalText>
            <TitleLogo>
              <VscAccount size="30" color="#000" />
            </TitleLogo>
            <b>{data.author}</b> {data.time}
            <MenuBar>
              <div className="menubar">
                <li>
                  <IoMdMore size="30" color="#adb5bd" />
                  <ul>
                    <div className="menubar-box">
                      <li className="menubar-border-bottom">
                        <a onClick={() => linkToModify()}>
                          {/* <ModifyButton onClick={() => linkToModify()}> */}
                          <div className="menubar-dark-text">수정하기</div>
                          {/* </ModifyButton> */}
                        </a>
                      </li>
                      <li>
                        <a onClick={() => deleteBoard()}>
                          {/* <DeleteButton onClick={() => deleteBoard()}> */}
                          <div className="menubar-red-text">삭제하기</div>
                          {/* </DeleteButton> */}
                        </a>
                      </li>
                    </div>
                  </ul>
                </li>
              </div>
            </MenuBar>
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
          <br />
        </MapBoxForm>
        <DayButtonForm>{buttons}</DayButtonForm>
        <br />
        {/* 여기가 지도 넣을 곳 */}
        {/* 데이 박스 */}
        {days}
      </PRForm>
    </>
  );
}
