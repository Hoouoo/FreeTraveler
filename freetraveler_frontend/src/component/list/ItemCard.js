import React from "react";
import styled from "styled-components";
// id, imgUrl, title, totalDay, totalCost, realization, pickCnt

import { RiThumbUpLine } from "react-icons/ri";

const ItemCardStyled = styled.div`
  background-color: white;
  margin: 10px;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.05);
  padding: 10px;

  .itemcard {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: 0px auto;
  }
  .profile_box {
    width: 100px;
    height: 100px;
    border-radius: 70%;
    overflow: hidden;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.125);
  }
  .profile_img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .content {
    padding: 0px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .content_name {
    font-size: 14px;
    /* color: lightgray; */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 300px;
  }

  .content_cost {
    font-size: 14px;
    /* color: lightgray; */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 300px;
  }

  .content_trans {
    font-size: 14px;
    /* color: lightgray; */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 300px;
  }

  .content_comment {
    font-size: 14px;
    /* color: lightgray; */
    width: 300px;
    height: max-content;

    /* 최대 두줄 표시 */
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .link_txt {
    font-size: 14px;
    /* font-weight: bold;
    text-decoration: none; */
    text-align: right;
  }
`;

function ItemCard({
  img = "이미지",
  name = "이름",
  how = "여행방법",
  days = "여행일수",
  cost = "여행비용",
  desc = "경험자의 한마디",
}) {
  return (
    <ItemCardStyled>
      <div className="itemcard">
        {/* 대표 사진 :  /css - profile_box */}
        <div className="profile_box">
          <img className="profile_img" src={img /*이미지*/} />
        </div>

        <div className="content">
          <span className="content_name">
            <b>이름 : </b> {name /*이름*/}
          </span>
          {/* 여행 방법 :  transfortation /  css - name_content_txt*/}
          <span className="content_cost">
            {" "}
            <b>여행 일수 : </b>
            {days /*여행일수*/} / <b> 여행 비용 : </b>
            {cost /*여행비용*/}
          </span>
          {/* 대표 제목 :  Title /  css - feed_name */}
          <span className="content_trans">
            {" "}
            <b>여행 방법 : </b>
            {how /*여행방법*/}{" "}
          </span>
          <span className="content_comment">
            {" "}
            {/*<RiThumbUpLine size="12" color="#000" />*/}
            <b>경험자의 한마디 :</b> {desc /*경험자의 한마디*/}
          </span>
        </div>
      </div>
    </ItemCardStyled>
  );
}

export default ItemCard;
