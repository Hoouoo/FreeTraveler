import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import PostButton from "./buttons/PostButton";
import { IoChevronForwardSharp } from "react-icons/io5";
import palette from "../../lib/styles/palette";
import { Link, useHistory, useLocation } from "react-router-dom";
import ItemCardGenerator from "../list/ItemCardGenerator";
import { useDispatch, useSelector } from "react-redux";
import { clearPostList, getPostClear, getPostList } from "../../module/posting";
import qs from "qs";
import { BASE_URL } from "../../lib/api/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faAngleRight,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";

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
    margin-top: 2px;
    font-size: 1.2rem;
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

    .bottom_button_container {
      bottom: 5vh;
    }

    .button_text {
      height: 2rem;
      font-size: 15px;
    }
    .button_icons {
      margin-top: 1.5px;
      font-size: 0.9rem;
    }
  }
`;

const SearchInput = styled.input`
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
  width: 100%;
  height: 1.8rem;
  margin-left: auto;
  border-radius: 0.2rem;
  border-width: 1px;
  border-style: solid;
  border-color: ${palette.gray[15]};
  background-color: ${palette.gray[16]};
  color: ${palette.gray[17]};
  /* line-height: 3.6rem; */
  position: relative;
`;

const SearchButton = styled.div`
  /* display: inline-block;
  cursor: pointer; */
  font-weight: 900;
  background-color: transparent;
  border: none;
  cursor: pointer;
  position: absolute;
  right: 5px;
  z-index: 1;
  color: ${palette.gray[17]};
  /* top: 50%; */
  transform: translatey(35%);
`;

const SearchBox = styled.div`
  position: relative;
  margin: 10px;
  /* grid-template-columns: 5% 95%; */
  /* display: grid; */
`;

const NavButton = styled.li`
  cursor: pointer;
  width: 10px;
  height: auto;
`;

const PageNavigator = styled.div``;

const Page = styled.li`
  /* float: left; */
  cursor: pointer;
  display: inline-block;
  list-style: none;
  height: 20px;
  width: 20px;
  /* color: #1e1e1e; */
  font-size: 14px;
  line-height: 18px;
  vertical-align: middle;
  margin: 5px;
  .click-page {
    font-size: 14px;
    font-weight: 700;
    color: white;
    background-color: ${palette.mint[1]};
    border-radius: 10px;
  }
`;

const NavPagination = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 28px 0;
  text-align: center;
  list-style: none;
`;

export default function PostListTemplate({ id, isPick = "all" }) {
  let [gen, setGen] = useState(new ItemCardGenerator());
  let [render, setRender] = useState(gen.render());
  let [pageNav, setPageNav] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  let [search, setSearch] = useState("");

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  let { data } = useSelector(({ post }) => ({
    data: post.postList,
  }));

  useEffect(() => {
    //조회 폼 제거
    console.log("isPick: " + isPick);
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
        page: query.page,
        pageSize: query.pageSize,
        sort: query.sort,
        orderBy: query.orderBy,
        search: query.search,
        method: query.method,
        isMyPick: query.isMyPick,
        isMine: query.isMine,
      },
    };

    console.log(request);
    // console.log(location);

    dispatch(getPostList(request));
  }, [history]);

  const generateItemCard = useCallback(() => {
    if (data != undefined && data != null && JSON.stringify(data) != "{}") {
      //아이템 카드 생성
      gen.clear();
      if (data.post != null) {
        for (let i = 0; i < data.post.length; i++) {
          data.post[i].repImg = BASE_URL + "/" + data.post[i].repimg;
          // console.log("------data.post[" + i + "]-----");
          // console.log(data.post[i]);
          // console.log("---------------------------");
          gen.addItemCard(data.post[i]);
        }
        // console.log("---------gen.render()-----------");
        // console.log(gen.render());
        setRender(gen.render());
      }
      setRender(gen.render());
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
          search: `page=${i}&pageSize=${6}&sort=recent&orderBy=desc&search=${search}&method=&isMyPick=${isPick}&isMine=false`,
        });
        setCurrentPage(i);
      };
      const index = pageBuf.push(
        <Page
          id={`page_${i + 1}`}
          key={`page_${i + 1}`}
          onClick={() => pageClick()}
        >
          <div className={currentPage == i ? "click-page" : ""}>{i + 1}</div>
        </Page>
      );
    }
    setPageNavCallback(
      <PageNavigator>
        <FontAwesomeIcon icon={faAngleLeft} />
        {pageBuf}
        <FontAwesomeIcon icon={faAngleRight} />
      </PageNavigator>
    );
    // // setPageNavCallback(<>{pageBuf}</>);
    // console.log("location----");
    // console.log(location);
  }, [data, history, location]);

  const onChange = (e) => {
    if (e.target.name == "searchInput") {
      setSearch(e.target.value);
    }
  };

  const searchButtonClick = () => {
    history.push({
      pathname: "/posting/list",
      search: `page=${0}&pageSize=${6}&sort=recent&orderBy=desc&search=${search}&method=&isMyPick=${isPick}&isMine=false`,
    });
  };

  return (
    <>
      <PostListBox>
        {/* <div className="header_text_container">
          <div className="header_text_title">포스트</div>
        </div> */}
        <SearchBox>
          <SearchButton onClick={() => searchButtonClick()}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </SearchButton>
          <SearchInput
            name="searchInput"
            value={search}
            onChange={onChange}
            placeholder="  어떤 곳으로 여행을 할까요?"
          />
        </SearchBox>
        {render}
        <div className="bottom_button_container">
          <Link to="/posting/write" style={{ textDecoration: "none" }}>
            <PostButton>
              글쓰기
              <div className="button_text"> gogo. </div>
              <div className="button_icons">
                <IoChevronForwardSharp color="#fff" />
              </div>
            </PostButton>
          </Link>
        </div>
        <NavPagination>{pageNav}</NavPagination>
      </PostListBox>
    </>
  );
}

// const data2 = {
//   page: 0,
//   max: 4,
//   pageSize: 6,
//   totalPost: 22,
//   post: [
//     {
//       id: 0,
//       author: "shpusan001",
//       repImg: "http://www.epj.co.kr/news/photo/201908/22686_32938_355.jpg",
//       postName: "포스트 제목",
//       totalCost: "10000",
//       totalDays: 3,
//       totalTrans: "대중교통",
//       comment: "경험자의 한마딥니다~~",
//       good: 3,
//       isPick: true,
//     },
//     {
//       id: 1,
//       author: "shpusan001",
//       repImg: "http://www.epj.co.kr/news/photo/201908/22686_32938_355.jpg",
//       postName: "포스트 제목",
//       totalCost: "10000",
//       totalDays: 3,
//       totalTrans: "대중교통",
//       comment: "경험자의 한마딥니다~~",
//       good: 3,
//       isPick: true,
//     },
//     {
//       id: 2,
//       author: "shpusan001",
//       repImg: "http://www.epj.co.kr/news/photo/201908/22686_32938_355.jpg",
//       postName: "포스트 제목",
//       totalCost: "10000",
//       totalDays: 3,
//       totalTrans: "대중교통",
//       comment: "경험자의 한마딥니다~~",
//       good: 3,
//       isPick: true,
//     },
//     {
//       id: 3,
//       author: "shpusan001",
//       repImg: "http://www.epj.co.kr/news/photo/201908/22686_32938_355.jpg",
//       postName: "포스트 제목",
//       totalCost: "10000",
//       totalDays: 3,
//       totalTrans: "대중교통",
//       comment: "경험자의 한마딥니다~~",
//       good: 3,
//       isPick: true,
//     },
//     {
//       id: 4,
//       author: "shpusan001",
//       repImg: "http://www.epj.co.kr/news/photo/201908/22686_32938_355.jpg",
//       postName: "포스트 제목",
//       totalCost: "10000",
//       totalDays: 3,
//       totalTrans: "대중교통",
//       comment: "경험자의 한마딥니다~~",
//       good: 3,
//       isPick: true,
//     },
//     {
//       id: 5,
//       author: "shpusan001",
//       repImg: "http://www.epj.co.kr/news/photo/201908/22686_32938_355.jpg",
//       postName: "포스트 제목",
//       totalCost: "10000",
//       totalDays: 3,
//       totalTrans: "대중교통",
//       comment: "경험자의 한마딥니다~~",
//       good: 3,
//       isPick: true,
//     },
//   ],
// };
