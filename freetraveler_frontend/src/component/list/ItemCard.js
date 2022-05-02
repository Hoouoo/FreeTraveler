import React from "react";
import styled from "styled-components";
// id, imgUrl, title, totalDay, totalCost, realization, pickCnt

import { RiThumbUpLine } from "react-icons/ri";

const ItemCardStyled = styled.div`
  background-color: white;
  margin: 10px;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.05);

  .back {
    display: flex;
    align-items: center;
    width: 100%;
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
      <div className="back">
        <div className="feed_name">
          {/* 대표 사진 :  /css - profile_box */}
          <div className="profile_box">
            <img className="profile_img" src={img /*이미지*/} />
          </div>

          <div className="name_content">
            {name /*이름*/}
            {/* 대표 제목 :  Title /  css - feed_name */}
            <span className="feed_name_txt"> {how /*여행방법*/} </span>
            {/* 여행 방법 :  transfortation /  css - name_content_txt*/}
            <span className="name_content_txt">
              {" "}
              {days /*여행일수*/} / {cost /*여행비용*/}
            </span>
            <span className="name_content_txt">
              {" "}
              <RiThumbUpLine size="12" color="#000" />
              {desc /*경험자의 한마디*/}
            </span>
          </div>
        </div>
      </div>
    </ItemCardStyled>
  );
}

export default ItemCard;
