import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PostButton from "./buttons/PostButton";
import { IoChevronForwardSharp } from "react-icons/io5";
import palette from "../../lib/styles/palette";
import { Link, useHistory, useLocation } from "react-router-dom";
import ItemCardGenerator from "../list/ItemCardGenerator";
import { useSelector } from "react-redux";

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

export default function PostListTemplate({ id }) {
  let [gen, setGen] = useState(new ItemCardGenerator());
  let [render, setRender] = useState(gen.render());
  const history = useHistory();
  const location = useLocation();
  const { data } = useSelector(({ post }) => ({
    data: post.postList,
  }));

  useEffect(() => {
    for (var i = 0; i <= 14; i++) {
      gen.addItemCard({
        id: i,
        img: "http://www.epj.co.kr/news/photo/201908/22686_32938_355.jpg",
        name: "제목이랍니다." + i,
        how: "비행기, 자동차, 도보",
        days: "5일",
        cost: "100만원",
        desc: "하와이는 와이키키를 추천합니다.",
      });
    }
    setRender(gen.render());
  }, [history, location]);

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
          <span>앞으로 </span>
          <span>뒤로 </span>
          <span>1/10페이지</span>
        </div>
      </PostListBox>
    </>
  );
}
