import React from "react";
import styled from "styled-components";
// id, imgUrl, title, totalDay, totalCost, realization, pickCnt

import { RiThumbUpLine } from "react-icons/ri";

const ItemCardStyled = styled.div`
  .back {
    display: flex;
    align-items: center;
    width: 75vh;
    height: 100%;
    margin: 0px auto;
  }
  .feed_name {
    padding: 0px 10px;
    font-weight: bold;
    display: flex;
    align-items: center;
  }
  .profile_box {
    width: 40px;
    height: 40px;
    border-radius: 70%;
    overflow: hidden;
  }
  .profile_img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .name_content {
    padding: 0px 10px;
    display: flex;
    flex-direction: column;
  }
  .name_content_txt {
    font-size: 12px;
    /* color: lightgray; */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 200px;
  }
  .link_txt {
    font-size: 14px;
    /* font-weight: bold;
    text-decoration: none; */
    text-align: right;
  }
`;

function ItemCard({}) {
  return (
    <ItemCardStyled>
      <div className="back">
        <div className="feed_name">
          {/* 대표 사진 :  /css - profile_box */}
          <div className="profile_box">
            {/* / <img className="profile_img"> */}
            대표 사진
          </div>

          <div className="name_content">
            대표 제목
            {/* 대표 제목 :  Title /  css - feed_name */}
            <span className="feed_name_txt"> 여행 방법 </span>
            {/* 여행 방법 :  transfortation /  css - name_content_txt*/}
            <span className="name_content_txt"> 여행일수 / 여행 비용</span>
            <span className="name_content_txt"> <RiThumbUpLine size="12" color="#000" />
            (+1000)  경험자의 한 마디~~~~~~~</span>
          </div>
        </div>
      </div>
    </ItemCardStyled>
  );
}

export default ItemCard;
