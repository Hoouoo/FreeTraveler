import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import PostButton from "./buttons/PostButton";
import { IoChevronForwardSharp } from "react-icons/io5";
import palette from "../../lib/styles/palette";
import { Link, useHistory, useLocation } from "react-router-dom";
import ItemCardGenerator from "../list/ItemCardGenerator";
import { useDispatch, useSelector } from "react-redux";
import { getPostClear, getPostList } from "../../module/posting";
import qs from "qs";
import { BASE_URL } from "../../lib/api/client";

const PostListBox = styled.div`
  width: auto;
  height: 100%;
  padding: 35px;
  margin-top: -10px;
  margin-left: 10%;
  margin-right: 10%;
  background-color: white;

  /* 헤더 텍스트 */
  .header_text_container {
    justify-content: space-between;
    display: flex;
  }

  .header_text_title {
    margin-left: 10px;
    font-size: 1.4 rem;
    font-weight: 700;
    color: ${palette.gray[10]};
  }

  /* nav 버튼 */
  .bottom_button_container {
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
  }

  .button_icons {
    margin-left: 1px;
    margin-right: -10px;
    margin-top: 4px;
  }

  .button_text {
    font-size: 1.2rem;
    margin-left: 8px;
    margin-top: -3px;
  }

  #itemcard_list {
    list-style-type: none;
    padding: 1px;
  }

  @media screen and (min-width: 1111px) {
    #itemcard_list {
      display: grid;
      grid-template-columns: 50% 50%;
      justify-content: center;
      align-items: center;
      padding: 1px;
    }
  }

  @media screen and (max-width: 612px) {
    padding: 5px;
    margin-top: -1px;
    margin-left: 2px;
    margin-right: 2px;
  }
`;

const NavButton = styled.div`
  cursor: pointer;
`;
const PageNavigator = styled.div``;
const Page = styled.div`
  cursor: pointer;
`;

export default function PostListTemplate({ id }) {
  let [gen, setGen] = useState(new ItemCardGenerator());
  let [render, setRender] = useState(gen.render());
  let [pageNav, setPageNav] = useState();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  let { data } = useSelector(({ post }) => ({
    data: post.postList,
  }));

  const data2 = {
    page: 0,
    max: 4,
    pageSize: 6,
    totalPost: 22,
    post: [
      {
        id: 0,
        author: "shpusan001",
        repImg: "http://www.epj.co.kr/news/photo/201908/22686_32938_355.jpg",
        postName: "포스트 제목",
        totalCost: "10000",
        totalDays: 3,
        totalTrans: "대중교통",
        comment: "경험자의 한마딥니다~~",
        good: 3,
        isPick: true,
      },
      {
        id: 1,
        author: "shpusan001",
        repImg: "http://www.epj.co.kr/news/photo/201908/22686_32938_355.jpg",
        postName: "포스트 제목",
        totalCost: "10000",
        totalDays: 3,
        totalTrans: "대중교통",
        comment: "경험자의 한마딥니다~~",
        good: 3,
        isPick: true,
      },
      {
        id: 2,
        author: "shpusan001",
        repImg: "http://www.epj.co.kr/news/photo/201908/22686_32938_355.jpg",
        postName: "포스트 제목",
        totalCost: "10000",
        totalDays: 3,
        totalTrans: "대중교통",
        comment: "경험자의 한마딥니다~~",
        good: 3,
        isPick: true,
      },
      {
        id: 3,
        author: "shpusan001",
        repImg: "http://www.epj.co.kr/news/photo/201908/22686_32938_355.jpg",
        postName: "포스트 제목",
        totalCost: "10000",
        totalDays: 3,
        totalTrans: "대중교통",
        comment: "경험자의 한마딥니다~~",
        good: 3,
        isPick: true,
      },
      {
        id: 4,
        author: "shpusan001",
        repImg: "http://www.epj.co.kr/news/photo/201908/22686_32938_355.jpg",
        postName: "포스트 제목",
        totalCost: "10000",
        totalDays: 3,
        totalTrans: "대중교통",
        comment: "경험자의 한마딥니다~~",
        good: 3,
        isPick: true,
      },
      {
        id: 5,
        author: "shpusan001",
        repImg: "http://www.epj.co.kr/news/photo/201908/22686_32938_355.jpg",
        postName: "포스트 제목",
        totalCost: "10000",
        totalDays: 3,
        totalTrans: "대중교통",
        comment: "경험자의 한마딥니다~~",
        good: 3,
        isPick: true,
      },
    ],
  };

  useEffect(() => {
    //조회 폼 제거
    dispatch(getPostClear());
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
        page: query.page,
        pageSize: query.pageSize,
        sort: query.sort,
        orderBy: query.orderBy,
        search: query.search,
        method: query.method,
        isMyPick: query.isMyPick,
      },
    };

    //console.log(request);

    dispatch(getPostList(request));
  }, [history, location]);

  const generateItemCard = useCallback(() => {
    console.log(data);
    if (data != undefined && data != null && JSON.stringify(data) != "{}") {
      //아이템 카드 생성
      gen.clear();
      if (data.post != null) {
        for (let i = 0; i < data.post.length; i++) {
          data.post[i].repImg = BASE_URL + "/" + data.post[i].repimg;
          console.log(data.post[i].repImg);
          gen.addItemCard(data.post[i]);
        }
        setRender(gen.render());
      }
    }
  });

  const setPageNavCallback = useCallback((e) => {
    setPageNav(e);
  });

  //서버로부터 postList data를 받아 오면 렌더링
  useEffect(() => {
    generateItemCard();

    //페이지 네비게이터 바 생성
    let pageBuf = new Array();
    for (let i = 0; i < data.max + 1; i++) {
      //버튼을 배열에 추가
      const pageClick = function () {
        history.push({
          pathname: "/posting/list",
          search: `page=${i}&pageSize=${6}&sort=recent&orderBy=desc&search=&method=&isMyPick=all`,
        });
      };
      const index = pageBuf.push(
        <Page
          id={`page_${i + 1}`}
          key={`page_${i + 1}`}
          onClick={() => pageClick()}
        >
          {i + 1}
        </Page>
      );
    }
    setPageNavCallback(<PageNavigator>{pageBuf}</PageNavigator>);
  }, [data]);

  return (
    <>
      <PostListBox>
        <div className="header_text_container">
          <div className="header_text_title">포스트</div>
        </div>
        {render}
        <div className="bottom_button_container">
          <Link to="/posting/write" style={{ textDecoration: "none" }}>
            <PostButton>
              글쓰기
              <div className="button_text"> gogo. </div>
              <div className="button_icons">
                <IoChevronForwardSharp size="20" color="#fff" />
              </div>
            </PostButton>
          </Link>
        </div>
        <div>
          <NavButton>앞으로 </NavButton>
          {pageNav}
          <NavButton>뒤로 </NavButton>
        </div>
      </PostListBox>
    </>
  );
}
