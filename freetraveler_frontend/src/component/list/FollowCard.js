import React, { useEffect, useState } from "react";
import styled from "styled-components";
import palette from "../../lib/styles/palette";
import {
  faPlus,
  faUserMinus,
  faPeopleArrowsLeftRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { removeFollow } from "../../module/follow";
import { useHistory } from "react-router-dom";

const FollowCardBox = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 3px ${palette.gray[12]};
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 10px;
  padding-right: 10px;
  margin: 10px;
`;

const FollowGridBox = styled.div`
  @media screen and (min-width: 612px) {
    display: grid;
    grid-template-columns: 50% 50%;
    justify-content: center;
    align-items: center;
    padding: 1px;
  }
`;

const FollowSubGridBox = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr;
`;

const FollowIdText = styled.text`
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const FollowNameText = styled.div`
  font-size: 14px;
  font-weight: 400;
`;

const FollowPlusButton = styled.button`
  width: 80px;
  height: auto;
  font-weight: 600;
  color: ${palette.line["9"]};
  display: inline-block;
  padding: 0.2em 0.5em;
  font-size: 12px;
  line-height: normal;
  vertical-align: middle;
  background-color: ${palette.btn[0]};
  cursor: pointer;
  border: 1px solid ${palette.btn[1]};
  border-bottom-color: ${palette.btn[2]};
  border-radius: 0.35em;
`;

const FollowMinusButton = styled.button`
  font-size: 15px;
  size: 50;
  /* font-weight: 600; */
  background-color: white;
  border: none;
  color: black;
  cursor: pointer;
  :hover {
    color: red;
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
  position: relative;
`;

const SearchButton = styled.div`
  font-weight: 900;
  background-color: white;
  border: none;
  cursor: pointer;
  position: absolute;
  right: 5px;
  z-index: 1;
  color: ${palette.gray[17]};
  transform: translatey(35%);
`;

const SearchBox = styled.div`
  position: relative;
  margin: 10px;
`;

const FollowCross = styled.div`
  .is-cross {
    display: inline-block;
    padding: 0.2em 0.8em;
    color: blue;
    font-size: 13px;
    font-weight: 700;
    line-height: normal;
    vertical-align: middle;
    /* background-color: ${palette.btn[0]};
    border: 1px solid ${palette.btn[1]};
    border-bottom-color: ${palette.btn[2]}; */
    border-radius: 0.35em;
  }

  .is-not-cross {
    display: inline-block;
    display: none;
  }
`;

const FollowCard = ({
  id = "id",
  name = "작성자",
  isCross = "false",
  isFollow,
  gen = null,
  index = 0,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [isCrossView, setIsCrossView] = useState(false);

  useEffect(() => {
    if (isCross == false) {
      setIsCrossView(false);
    } else {
      setIsCrossView(true);
    }
  }, []);

  const followRemoveAction = () => {
    gen.remove(index);
    dispatch(removeFollow({ data: { id: id } }));
  };

  const gotoFriendPost = () => {
    history.push(
      `/posting/list?page=0&pageSize=6&sort=recent&orderBy=desc&search=&method=&isMyPick=all&isMine=false&friend=${id}`
    );
  };

  return (
    <FollowCardBox>
      <FollowSubGridBox
        onClick={() => {
          gotoFriendPost();
        }}
      >
        <FollowIdText>{id}</FollowIdText>

        <FollowCross>
          <div className={isCrossView ? "is-cross" : "is-not-cross"}>
            <FontAwesomeIcon icon={faPeopleArrowsLeftRight} color="black" />
            {"  "}맞팔로우
          </div>
        </FollowCross>
      </FollowSubGridBox>

      <FollowSubGridBox>
        <FollowNameText
          onClick={() => {
            gotoFriendPost();
          }}
        >
          {name}
        </FollowNameText>
        {isFollow && (
          <FollowMinusButton onClick={() => followRemoveAction()}>
            <FontAwesomeIcon icon={faUserMinus} />
          </FollowMinusButton>
        )}
      </FollowSubGridBox>
    </FollowCardBox>
  );
};

export default FollowCard;
