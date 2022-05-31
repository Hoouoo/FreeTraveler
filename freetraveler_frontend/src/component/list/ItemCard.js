import React, { useState } from "react";
import styled from "styled-components";
import { IoChevronForwardSharp } from "react-icons/io5";
// id, imgUrl, title, totalDay, totalCost, realization, pickCnt
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp as faSolidThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as faRegularThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";
import { BsHandThumbsUp } from "react-icons/bs";
import { RiThumbUpLine } from "react-icons/ri";
import { useHistory } from "react-router-dom";
import palette from "../../lib/styles/palette";

const ItemCardStyled = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 3px ${palette.gray[12]};
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
  .itemcard_comment {
    display: flex;
    background-image: initial;
    background-position-x: initial;
    background-position-y: initial;
    background-size: initial;
    background-attachment: initial;
    background-origin: initial;
    background-clip: initial;
    background-color: rgb(248, 248, 248);
    padding: 12px;
    margin: -9px;

    border-end-end-radius: 10px;
    border-end-start-radius: 10px;
  }
  .comment_title {
    /* float: left; */
    /* padding: 15px; */
    margin-bottom: -3px;
    margin-right: 5px;
    font-weight: 700;
    font-size: 13px;
    line-height: 24px;
    color: ${palette.gray[10]};
  }
  .comment {
    /* float: right; */
    /* padding: 15px; */
    font-weight: 700;
    font-size: 13px;
    line-height: 24px;
    color: ${palette.gray[13]};
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
  }
`;

const ItemCardContentStyled = styled.div`
  /* margin-top: 40px; */
  margin: 5px;
  /* padding: 0px 10px; */
  display: flex;
  flex-direction: column;
  text-align: right;
  .mb-4 {
    margin-bottom: 20px;
  }
  .mt-1 {
    margin-top: 5px;
  }
  .ml-1 {
    margin-left: 5px;
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
    font-size: 1.3rem;
    font-weight: 750;
    line-height: 1.8rem;
    text-align: left;
    float: left;
    margin-bottom: 15px;
  }

  .content_title_list {
    /* padding-bottom: 1rem; */
    margin-top: 5px;
    vertical-align: middle;
    text-align: left;
    /* margin-left: 30%; */
  }

  .content_list {
    /* display: flex; */
    vertical-align: middle;
    text-align: right;
    /* margin-left: 75%; */
  }

  .content_sub_title_gray {
    /* float: left; */
    margin-bottom: 3px;
    font-weight: 700;
    font-size: 14px;
    line-height: 24px;
    color: ${palette.gray[10]};
    text-align: right;
  }
  .content_sub_title_dark {
    float: right;
    margin-left: 5px;
    margin-bottom: 3px;
    font-weight: 700;
    font-size: 14px;
    line-height: 24px;
    color: ${palette.gray[13]};
    text-align: left;
  }

  /* .content_pick {
    display: flex;
    font-size: 20px;
    text-align: right;
    float: right;
  } */

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

  @media screen and (max-width: 612px) {
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
  }
`;
const IconForm = styled.div`
  width: 100%;
  height: 100%;
  float: right;
  font-size: 30px;
  .origin-color {
    color: ${palette.gray[13]};
  }
  .pick-color {
    color: ${palette.mint[0]};
  }
  .like-color {
    color: ${palette.line[12]};
  }
  .content_pick {
    /* display: inline-block; */
    display: flex;
    font-size: 20px;
    text-align: right;
    float: right;
  }
`;
function ItemCard({
  id = "id",
  author = "작성자",
  repImg = "이미지",
  postName = "이름",
  totalTrans = "여행방법",
  totalDays = "여행일수",
  cost = "여행비용",
  comment = "경험자의 한마디",
  good = 3,
  isPick = false,
}) {
  const history = useHistory();
  const onClick = function (id) {
    history.push("/posting/read?id=" + id);
  };

  const [isLikeToggled, setIsLikeToggled] = useState(false);
  const [isPickToggled, setIsPickToggled] = useState(false);

  return (
    <ItemCardStyled onClick={() => onClick(id)}>
      <div className="itemcard">
        {/* 대표 사진 :  /css - profile_box */}
        <div className="profile_box">
          <img className="profile_img" src={repImg /*이미지*/} />
        </div>

        <ItemCardContentStyled>
          <div className="content_title_list">
            <div className="content_name">
              {postName /*이름*/}

              <IconForm>
                <div className="content_pick">
                  <div
                    className="mt-1 like-color"
                    onClick={() => {
                      setIsLikeToggled(!isLikeToggled);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={!isLikeToggled ? faRegularHeart : faSolidHeart}
                    />
                  </div>
                  <div className="mt-1 ml-1"> +{good} </div>
                </div>
              </IconForm>
            </div>
          </div>
          {/* 여행 방법 :  transfortation /  css - name_content_txt*/}
          {/* <div className="content_list"> */}
          <div className="content_list">
            <div className="content_sub_title_gray">
              작성자 |{" "}
              <div className="content_sub_title_dark">
                {author /*여행일수*/}
              </div>
            </div>
          </div>
          <div className="content_list">
            <div className="content_sub_title_gray">
              여행 일수 |
              <div className="content_sub_title_dark">
                {totalDays /*여행일수*/}
              </div>
            </div>
          </div>

          <div className="content_list">
            <div className="content_sub_title_gray">
              {" "}
              여행 비용 |
              <div className="content_sub_title_dark">{cost /*여행비용*/}</div>
            </div>
          </div>
          {/* 대표 제목 :  Title /  css - feed_name */}

          <div className="content_list mb-4">
            <div className="content_sub_title_gray">
              {" "}
              여행 방법 |{" "}
              <div className="content_sub_title_dark">
                {totalTrans /*여행방법*/}
              </div>
            </div>
          </div>
        </ItemCardContentStyled>
      </div>

      <div className="itemcard_comment">
        <div className="comment_title">STORY</div>
        <div className="comment">{comment /*경험자의 한마디*/}</div>
        <IconForm>
          <div className="content_pick">
            <div
              className={!isPickToggled ? "origin-color" : "pick-color"}
              onClick={() => {
                setIsPickToggled(!isPickToggled);
              }}
            >
              <FontAwesomeIcon
                icon={!isPickToggled ? faRegularThumbsUp : faSolidThumbsUp}
              />
            </div>
          </div>
        </IconForm>
      </div>
      {/* </div> */}
    </ItemCardStyled>
  );
}

export default ItemCard;
