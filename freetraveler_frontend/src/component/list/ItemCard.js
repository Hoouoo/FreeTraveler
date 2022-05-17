import React from "react";
import styled from "styled-components";
import { IoChevronForwardSharp } from "react-icons/io5";
// id, imgUrl, title, totalDay, totalCost, realization, pickCnt
import { BsHandThumbsUp } from "react-icons/bs";
import { RiThumbUpLine } from "react-icons/ri";

const ItemCardStyled = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.05);
  padding: 10px;
  margin: 8px;

  .itemcard {
    padding-top: 0px;
    border-top-left-radius: 0.4rem;
    border-top-right-radius: 0.4rem;
    overflow-x: hidden;
    overflow-y: hidden;
  }

  .profile_box {
    width: 100%;
    height: 200px;
  }

  .profile_img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .content {
    margin: 10px;
    padding: 0px 10px;
    display: flex;
    flex-direction: column;
  }
  .content_name {
    /* font-size: 14px; */
    /* color: lightgray; */
    /* overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 300px; */
    width: 100%;
    display: -webkit-box;
    overflow-x: hidden;
    overflow-y: hidden;
    text-overflow: ellipsis;
    white-space: inherit;
    word-wrap: break-word;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    color: rgb(26, 26, 26);
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 1.8rem;
  }

  .content_list {
    margin-top: auto;
    padding-bottom: 1rem;
    vertical-align: middle;
    text-align: right;
  }

  .content_cost {
    font-size: 1.2rem;
    font-weight: 400;
    color: rgb(26, 26, 26);
    text-align: right;
  }

  .content_trans {
    font-size: 1.2rem;
    font-weight: 400;
    color: rgb(26, 26, 26);
    text-align: right;
  }

  .content_pick {
    display: inline-block;
    margin-top: 0.2rem;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
  }

  .content_second_list {
    border-top-left-radius: 0.4rem;
    border-top-right-radius: 0.4rem;
    border-bottom-left-radius: 0.4rem;
    border-bottom-right-radius: 0.4rem;
    margin-top: auto;
    padding-bottom: 1rem;
    vertical-align: middle;
    text-align: right;
    background-color: rgb(233, 233, 233);
  }
  .content_comment {
    margin-top: 0.8rem;
    display: -webkit-box;
    text-overflow: ellipsis;
    word-wrap: break-word;
  }

  .link_txt {
    font-size: 14px;
    /* font-weight: bold;
    text-decoration: none; */
    text-align: right;
  }

  @media screen and (max-width: 612px) {
    .profile_box {
      width: 100%;
      height: 180px;
    }
    .profile_img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .content_name {
      line-height: 1.5rem;
    }

    .content_cost {
      /* font-size: 12px; */
      /* color: lightgray; */
      /* overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 200px; */
      font-size: 1rem;
    }

    .content_trans {
      font-size: 1rem;
    }

    .link_txt {
      font-size: 12px;
      /* font-weight: bold;
    text-decoration: none; */
      text-align: right;
    }
  }
`;

function ItemCard({
  id = "id",
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
          <div className="content_name">{name /*이름*/}</div>
          <div className="content_pick">
            <BsHandThumbsUp size="20" color="#000" />
            +999{}
          </div>
          {/* 여행 방법 :  transfortation /  css - name_content_txt*/}
          <div className="content_list">
            <div className="content_cost">
              {" "}
              <b>여행 일수 | </b>
              {days /*여행일수*/}
            </div>
            <div className="content_cost">
              {" "}
              <b> 여행 비용 | </b>
              {cost /*여행비용*/}
            </div>
            {/* 대표 제목 :  Title /  css - feed_name */}
            <div className="content_trans">
              {" "}
              <b>여행 방법 | </b>
              {how /*여행방법*/}{" "}
            </div>
          </div>
          <div className="content_comment">
            {" "}
            {/*<RiThumbUpLine size="12" color="#000" />*/}
            {desc /*경험자의 한마디*/}
          </div>
        </div>
      </div>
    </ItemCardStyled>
  );
}

export default ItemCard;
