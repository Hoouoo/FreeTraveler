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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp as faSolidThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as faRegularThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faPeopleArrowsLeftRight,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import {
  getPost,
  getPostClear,
  good,
  loadModBuffer,
  mypick,
  postCheckFalse,
  postRemoveCheckFalse,
} from "../../../module/posting";
import { BsHandThumbsUp } from "react-icons/bs";
import { RiThumbUpLine } from "react-icons/ri";
import { AiOutlineSmile as DayIcon1 } from "react-icons/ai";
import { BiSmile as DayIcon2, BiWinkSmile as DayIcon3 } from "react-icons/bi";
import { FiSmile as DayIcon4 } from "react-icons/fi";
import { FaRegSmile as DayIcon5 } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import {
  CgSmileMouthOpen as DayIcon6,
  CgSmileNoMouth as DayIcon7,
} from "react-icons/cg";
import { useHistory, useLocation } from "react-router-dom";
import qs from "qs";
import { removePost } from "../../../module/posting";
import { IoMdMore } from "react-icons/io";
import { BASE_URL } from "../../../lib/api/client";

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

const UserText = styled.div`
  float: left;
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
  @media screen and (max-width: 1000px) {
    grid-column-start: 1;
    grid-column-end: 4;
  }
`;

const TitleLine = styled.div`
  display: grid;
  grid-template-columns: 70% 15% 15%;
  grid-template-rows: 50% 0;
  @media screen and (max-width: 1000px) {
    grid-template-columns: 70% 5% 25%;
    grid-template-rows: 30% 5% 0;
  }
`;

const IconForm = styled.div`
  margin-top: 40px;
  width: 100%;
  height: 100%;
  float: right;
  font-size: 20px;
  .origin-color {
    width: 100px;
    color: ${palette.gray[13]};
    /* background-color: white;
    border-radius: 4px;
    border: 1px solid ${palette.gray[14]}; */
  }
  .like-color {
    width: 100px;
    color: ${palette.mint[0]};
    /* background-color: white;
    border-radius: 4px;
    border: 1px solid ${palette.gray[14]}; */
  }
  .pick-color {
    width: 100px;
    color: ${palette.pink[0]};
    /* background-color: white;
    border-radius: 4px;
    border: 1px solid rgba(64, 64, 64, 50%); */
  }
  .num-font-size {
    margin: 5px;
    font-size: 15px;
    font-weight: 600;
  }
  @media screen and (max-width: 1124px) {
    .pick-color {
      width: 100px;
      margin-left: -30px;
    }
  }
  @media screen and (max-width: 1000px) {
    .pick-color {
      width: 80px;
      margin-left: 70%;
    }
    .num-font-size {
      font-size: 12px;
    }
  }
  @media screen and (max-width: 770px) {
    .pick-color {
      width: 80px;
      margin-left: 60%;
    }
    .num-font-size {
      font-size: 12px;
    }
  }
`;

const TotalTextInfo = styled.div`
  margin: 10px;
  font-size: 1rem;
  font-weight: 500;
  color: rgb(26, 26, 26);
  text-align: left;
  .title-text {
    margin-bottom: 5px;
    margin-right: 5px;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    color: ${palette.mint[0]};
  }
`;

const MapMarker = styled.div`
  background-color: white;
  padding: 15px;
`;

const DayButtonForm = styled.div`
  /* height: auto;
  border: solid 2px;
  border-color: ${palette.mint[0]};
  padding: 0.5rem;
  border-radius: 0.4rem; */
`;

const DayMapClickTitle = styled.div`
  margin-bottom: 5px;
  font-weight: 700;
  font-size: 15px;
  line-height: 24px;
  margin-left: 10px;
  color: ${palette.mint[0]};
`;

const DayButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-self: center;
  align-content: center;
  align-items: center;
  display: inline-block;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  padding-left: 0.8rem;
  padding-right: 0.8rem;

  /* border-width: 1.5px; */
  /* border-style: solid; */
  margin: 0.2rem;
  border-radius: 3rem;
  color: gray;
  font-weight: 400;
  cursor: pointer;
  .text-form {
    font-size: 13px;
    font-weight: 800;
    color: gray;
  }
  :hover > .text-form {
    /* background-color: ${palette.gray[3]}; */
    color: white;
  }
  :hover {
    background-color: ${palette.gray[3]};
    color: white;
  }
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
    /* background: none; */
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
    /* height: 100px; */
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .menubar li {
    /* margin-top: 20px; */
    /* margin-right: -100px; */
    list-style: none;
    float: right;
    padding: 0px;
  }

  .menubar-icon-ml {
    margin-left: 110px;
  }

  .menubar li a {
    background-color: white;
    color: black;
    display: block;
    font-weight: normal;
    line-height: 30px;
    /* padding: 10px; */
    margin: 5px;
    text-align: center;
    text-decoration: none;
  }

  /* 평상시에는 드랍메뉴가 안보이게 하기 */
  /* .menubar li ul {
    display: none;
    height: auto;
    padding: 0px;
    margin-left: -90px;
    border: 0px;
    position: absolute;
    width: 130px;
    z-index: 200;
  } */

  .menubar-hide {
    display: none;
    height: auto;
    padding: 0px;
    /* margin-left: -180px; */
    border: 0px;
    position: absolute;
    /* width: 130px; */
    z-index: 200;
  }
  .menubar-dark-text {
    /* width: 10px; */
    font-size: 14px;
    font-weight: 400;
    color: ${palette.gray[13]};
    /* object-fit: cover; */
    /* border-radius: 4px; */
    /* text-align: left;
    margin-left: 5px; */
  }
  .menubar-red-text {
    /* width: 10px; */
    font-size: 14px;
    font-weight: 400;
    color: red;
    /* border-radius: 4px; */
    object-fit: cover;
  }

  /* 마우스 커서 올리면 드랍메뉴 보이게 하기 */
  /* .menubar li:active ul {
    display: block;
  } */

  .menubar li li {
    display: block;
    float: none;
    margin: 0px;
    padding: 0px;
    width: 100%;
    border-radius: 4px;
    background: none;
  }

  /* .menubar li:hover li a {
    background: none;
  } */

  /* .menubar li ul a {
    width: 100%;
    display: block;
    height: 50px;
    font-size: 12px;
    font-style: normal;
  } */

  /* 클릭 시  */
  /* .menubar li ul a:active,
  .menubar li ul li:active a {
    cursor: pointer;
    width: 100%;
    border: 0px;
    text-decoration: none;
  } */

  .menubar-show {
    display: block;
    cursor: pointer;
    width: 100%;
    border: 0px;
    text-decoration: none;
    /* object-fit: cover; */
  }
  @media screen and (max-width: 612px) {
    .menubar li ul {
      margin-left: -100px;
    }
    .menubar-show {
      margin-left: 100px;
      width: 130px;
    }
    .menubar-box {
      width: 130px;
    }
  }
  @media screen and (max-width: 321px) {
    .menubar li {
      margin-top: -20px;
    }
  }
`;

const FollowCross = styled.div`
  float: left;
  .is-cross {
    margin-left: 5px;
    display: inline-block;
    padding: 0.2em 0.5em;
    color: blue;
    font-size: 11px;
    font-weight: 700;
    line-height: normal;
    vertical-align: middle;
    background-color: white;
    border: 1px solid ${palette.btn[1]};
    /* border-bottom-color: ${palette.btn[2]}; */
    border-radius: 0.35em;
  }

  .is-not-cross {
    display: none;
  }
`;

const MyPost = styled.div`
  /* float: left; */
  /* margin-top: -15%; */
  .is-mypost {
    margin-left: 5px;
    display: inline-block;
    padding: 0.2em 0.5em;
    color: black;
    font-size: 11px;
    font-weight: 700;
    line-height: normal;
    vertical-align: middle;
    background-color: white;
    border: 1px solid ${palette.btn[1]};
    /* border-bottom-color: ${palette.btn[2]}; */
    border-radius: 0.35em;
  }

  .is-not-mypost {
    display: none;
  }
`;

const { kakao } = window;

const PostInput = styled.input``;

//goodcheck

export default function PostReadForm({ id }) {
  var [gen, setGen] = useState(new PRDayBoxGenerator());
  var [days, setDays] = useState(gen.render());
  var [dayIndex, setDayIndex] = useState([]);
  var [buttons, setButtons] = useState([]);
  var [markers, setMarkers] = useState([]);
  var [lines, setLines] = useState([]);

  const [isLikeToggled, setIsLikeToggled] = useState(false);
  const [isPickToggled, setIsPickToggled] = useState(false);
  const [isCrossView, setIsCrossView] = useState(true);
  const [isMyPost, setIsMyPost] = useState(true);

  const [isToggled, setIsToggled] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const { data } = useSelector(({ post }) => ({
    data: post.postRead,
  }));

  const location = useLocation();
  const { user } = useSelector(({ user }) => ({ user: user.user }));

  const [tempGoodPlus, setTempGoodPlus] = useState(0);

  //let [data, setData] = useState(select);

  //카카오 맵
  var map;

  const getData = function () {
    const query = qs.parse(history.location.search, {
      ignoreQueryPrefix: true, // 물음표를 제거하고 받아오기 위해서
    });

    const queryId = query.id;

    //console.log("readId: " + queryId);

    var request = { params: { id: queryId } };
    dispatch(getPost(request));
  };

  const createMap = function () {
    //기본좌표 설정
    var loc_init_x = 126.974936;
    var loc_init_y = 37.559737;

    if (data != undefined && data != null && JSON.stringify(data) != "{}") {
      // 데이터의 장소 정보 검사
      if (data.days != null) {
        //가장 처음 장소를 기본 좌표로 설정
        if (data.days[0][0] != null) {
          loc_init_x = data.days[0][0].loc_x;
          loc_init_y = data.days[0][0].loc_y;
        }
      }
    }

    var mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(loc_init_y, loc_init_x), // 지도의 중심좌표
        level: 13, // 지도의 확대 레벨
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
        <FaMapMarkerAlt size="15" color="gray" />
        All Day
      </DayButton>
    );

    setButtons(buttons);

    //Day 버튼 추가
    let promise = new Promise((resolve, reject) => {
      for (var i = 1; i < data.days.length + 1; i++) {
        buttons.push(
          <DayButton key={"daybutton_" + i} id={"daybutton_" + i}>
            <label className="text-form">
              #{i} {"   "}
            </label>
            day
          </DayButton>
        );
      }
      resolve();
    })
      .then(() => {
        for (var i = 1; i < data.days.length + 1; i++) {
          //버튼에 색상 주기
          var domObj = document.getElementById("daybutton_" + i);
          domObj.style.backgroundColor = palette.cyan[i % palette.cyan.length];

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
    //setData(select);
    //캐시 비우기
    getData();
  }, []);

  const placeImgFilter = () => {
    for (let i = 0; i < data.days.length; i++) {
      for (let j = 0; j < data.days[i].length; j++) {
        data.days[i][j].img = BASE_URL + "/" + data.days[i][j].img;
      }
    }
  };

  useEffect(() => {
    //데이터 유/무 검사
    if (data != undefined && data != null && JSON.stringify(data) != "{}") {
      // 데이터의 장소 정보 검사
      createMap();
      data.repimg = BASE_URL + "/" + data.repimg;
      if (data.days != null) {
        placeImgFilter();
        createCustomOverlay();
        createLine();
        createDayButton();
        createDayBox();
      }

      //날짜 필터
      data.time = data.time.split("T")[0];

      //좋아요, 마이픽
      if (data.isGood == "true") {
        setIsLikeToggled(true);
      } else {
        setIsLikeToggled(false);
      }

      if (data.isPick == "true") {
        setIsPickToggled(true);
      } else {
        setIsPickToggled(false);
      }

      setIsCrossView(data.isCross);
      setIsMyPost(user.userId == data.author);
    }
  }, [data, location]);

  const { postRemoveCheck } = useSelector(({ post }) => ({
    postRemoveCheck: post.postRemoveCheck,
  }));

  useEffect(() => {
    if (postRemoveCheck) {
      history.push(
        "/posting/list?page=0&pageSize=6&sort=recent&orderBy=desc&search=&method=&isMyPick=all&isMine=false&friend="
      );
      dispatch(postRemoveCheckFalse());
    }
  }, [postRemoveCheck]);

  const linkToModify = function () {
    dispatch(loadModBuffer(data));
    history.push("/posting/modify");
  };

  const linkToModifyList = function () {
    history.push(`/posting/modify_list?id=${data.id}`);
  };

  const deleteBoard = function () {
    dispatch(removePost({ data: { id: data.id } }));
  };

  //토글 메뉴바
  const toggleMenu = function () {
    setIsToggled((isToggled) => !isToggled);
  };

  //마이픽 클릭
  const onClickMyPick = function () {
    if (!isPickToggled) {
      const request = {
        boardId: data.id,
        userId: user.userId,
        action: "pick",
      };
      dispatch(mypick(request));
      setIsPickToggled(!isPickToggled);
    } else {
      const request = {
        boardId: data.id,
        userId: user.userId,
        action: "cancel",
      };
      dispatch(mypick(request));
      setIsPickToggled(!isPickToggled);
    }
  };

  //좋아요 클릭
  const onClickLike = function () {
    if (!isLikeToggled) {
      const request = {
        boardId: data.id,
        userId: user.userId,
        action: "good",
      };
      dispatch(good(request));
      setIsLikeToggled(!isLikeToggled);
      setTempGoodPlus(1);
    } else {
      const request = {
        boardId: data.id,
        userId: user.userId,
        action: "cancel",
      };
      dispatch(good(request));
      setIsLikeToggled(!isLikeToggled);
      setTempGoodPlus(0);
    }
  };

  return (
    <>
      <PRForm>
        <ImgForm>
          <div className="image-box">
            <img className="image-inbox" src={data.repimg} />
          </div>
        </ImgForm>
        <TitleLine>
          <TitleText>{data.postName}</TitleText>
          <IconForm>
            <div
              className="pick-color"
              onClick={() => {
                onClickMyPick();
              }}
            >
              <FontAwesomeIcon
                icon={!isPickToggled ? faRegularHeart : faSolidHeart}
              />
              <label class="num-font-size">My Pick</label>
            </div>
          </IconForm>
          <IconForm>
            <div
              className={!isLikeToggled ? "origin-color" : "like-color"}
              onClick={() => {
                onClickLike();
              }}
            >
              <FontAwesomeIcon
                icon={!isLikeToggled ? faRegularThumbsUp : faSolidThumbsUp}
              />
              <label class="num-font-size">
                좋아요 +{data.good + tempGoodPlus}
              </label>
            </div>
          </IconForm>
        </TitleLine>
        <TitleObjectText>
          <TotalText>
            <TitleLogo>
              <VscAccount size="30" color="#000" />
            </TitleLogo>
            {/* <TitleLogo> */}
            <UserText>
              <b>{data.author}</b>
            </UserText>
            <FollowCross>
              <div className={isCrossView ? "is-cross" : "is-not-cross"}>
                <FontAwesomeIcon icon={faPeopleArrowsLeftRight} color="black" />
                {"  "}맞팔로우
              </div>
            </FollowCross>

            <MyPost>
              <div className={isMyPost ? "is-mypost" : "is-not-mypost"}>
                <FontAwesomeIcon icon={faBars} color="black" />
                {"  "}내 글
              </div>
            </MyPost>
            <br />
            {data.time}
            {(user.userId == data.author || data.isCross == true) && (
              <MenuBar>
                <div className="menubar">
                  <li>
                    <div className="menubar-icon-ml">
                      <IoMdMore
                        size="30"
                        color="#adb5bd"
                        onClick={() => toggleMenu()}
                      />
                    </div>
                    <ul>
                      <div
                        className={isToggled ? "menubar-show" : "menubar-hide"}
                      >
                        {/* {(user.userId == data.author || data.isCross == true) && ( */}
                        <div className="menubar-box">
                          <li className="menubar-border-bottom">
                            <a onClick={() => linkToModify()}>
                              {/* <ModifyButton onClick={() => linkToModify()}> */}

                              <div className="menubar-dark-text">수정하기</div>

                              {/* </ModifyButton> */}
                            </a>
                          </li>
                          <li className="menubar-border-bottom">
                            <a onClick={() => linkToModifyList()}>
                              {/* <ModifyButton onClick={() => linkToModify()}> */}

                              <div className="menubar-dark-text">
                                수정 로그 보기
                              </div>

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
                      </div>
                    </ul>
                  </li>
                </div>
              </MenuBar>
            )}
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
        {/* <CommentBox> */}
        <TotalTextInfo>
          <div class="title-text">STORY</div>
          {data.comment}
        </TotalTextInfo>
        {/* </CommentBox> */}
        {/* 여기가 지도 넣을 곳 */}
        <MapBoxForm>
          <MapForm id="map"></MapForm>
          <br />
        </MapBoxForm>
        <DayButtonForm>
          <DayMapClickTitle>여행 경로 정보</DayMapClickTitle>
          {buttons}
        </DayButtonForm>
        <br />
        {/* 여기가 지도 넣을 곳 */}
        {/* 데이 박스 */}
        {days}
      </PRForm>
    </>
  );
}
