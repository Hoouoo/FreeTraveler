import React, { useEffect, useState, useCallback } from "react";
import Footer from "../component/common/Footer";
import Slider from "../component/slider/SliderPage";
import styled from "styled-components";
import PostButton from "../component/post/buttons/PostButton";
import { IoChevronForwardSharp } from "react-icons/io5";
import palette from "../lib/styles/palette";
import { Link, useHistory, useLocation } from "react-router-dom";
import ItemCardGenerator from "../component/list/ItemCardGenerator";
import { useDispatch, useSelector } from "react-redux";
import { clearPostList, getPostClear, getPostList } from "../module/posting";
import qs from "qs";
import { BASE_URL } from "../lib/api/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HomePageBox = styled.div`
  width: auto;
  height: 100%;
  padding: 35px;
  margin-top: -10px;
  margin-left: 10%;
  margin-right: 10%;
  background-color: white;
  @media screen and (max-width: 612px) {
    padding: 5px;
    margin-top: -1px;
    margin-left: 2px;
    margin-right: 2px;
  }
`;

const TitleText = styled.div`
  margin-left: 1%;
  margin-top: 5%;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.9rem;
  color: ${palette.gray[13]};
  @media screen and (max-width: 612px) {
    font-size: 15px;
  }
`;

const ListStyled = styled.div`
  /* margin-left: -5%; */

  #itemcard_list {
    list-style-type: none;
    padding: 1px;
  }
  @media screen and (min-width: 1111px) {
    #itemcard_list {
      display: grid;
      grid-template-columns: 33% 33% 33%;
      justify-content: center;
      align-items: center;
      padding: 1px;
    }
  }
`;

function HomePage() {
  let [gen, setGen] = useState(new ItemCardGenerator());
  let [render, setRender] = useState(gen.render());

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  let { data } = useSelector(({ post }) => ({
    data: post.postList,
  }));

  useEffect(() => {
    //조회 폼 제거
    dispatch(getPostClear());
    dispatch(clearPostList());
  }, []);

  //서버에 페이지 요청
  useEffect(() => {
    //데이터 로드
    const query = qs.parse(location.search, {
      ignoreQueryPrefix: true,
      // 문자열 맨 앞의 ?를 생력
    });

    //console.log(query);

    const request = {
      params: {
        page: 0,
        pageSize: 6,
        sort: "random",
        orderBy: "asc",
        search: "",
        method: "",
        isMyPick: "all",
        isMine: "false",
        friend: "",
      },
    };

    dispatch(getPostList(request));
  }, [history]);

  const generateItemCard = useCallback(() => {
    if (data != undefined && data != null && JSON.stringify(data) != "{}") {
      //아이템 카드 생성
      gen.clear();
      if (data.post != null) {
        for (let i = 0; i < data.post.length; i++) {
          data.post[i].repImg = BASE_URL + "/" + data.post[i].repimg;
          gen.addItemCard(data.post[i]);
        }
        setRender(gen.render());
      }
      setRender(gen.render());
    }
  });

  //서버로부터 postList data를 받아 오면 렌더링
  useEffect(() => {
    generateItemCard();
  }, [data, history, location]);

  return (
    <>
      <HomePageBox>
        <Slider />
        <TitleText>추천 자유 여행지</TitleText>
        <ListStyled>{render}</ListStyled>
      </HomePageBox>
      <Footer />
    </>
  );
}

export default HomePage;
