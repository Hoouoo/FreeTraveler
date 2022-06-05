import React from "react";
import styled from "styled-components";
import palette from "../../lib/styles/palette";
import { faPlus, faUserMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { removeFollow } from "../../module/follow";
import { useHistory } from "react-router-dom";

const FollowBox = styled.div`
  width: auto;
  height: 100%;
  padding: 35px;
  margin-top: -10px;
  margin-left: 10%;
  margin-right: 10%;
  background-color: white;
`;

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
  /* line-height: 3.6rem; */
  position: relative;
`;

const SearchButton = styled.div`
  /* display: inline-block;
  cursor: pointer; */
  font-weight: 900;
  background-color: white;
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

const FollowCard = ({ id = "id", name = "작성자", gen = null, index = 0 }) => {
  const dispatch = useDispatch();
  const history = useHistory();

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
    // <FollowBox>
    //   <SearchBox>
    //     <SearchButton onClick={() => searchButtonClick()}>
    //       <FontAwesomeIcon icon={faPlus} />
    //     </SearchButton>
    //     <SearchInput
    //       placeholder=" 팔로우 대상"
    //     />
    //   </SearchBox>
    //   {followRenderBox}
    // </FollowBox>

    <FollowCardBox>
      <FollowSubGridBox
        onClick={() => {
          gotoFriendPost();
        }}
      >
        <FollowIdText>{id}</FollowIdText>
      </FollowSubGridBox>

      <FollowSubGridBox>
        <FollowNameText
          onClick={() => {
            gotoFriendPost();
          }}
        >
          {name}
        </FollowNameText>
        <FollowMinusButton onClick={() => followRemoveAction()}>
          <FontAwesomeIcon icon={faUserMinus} />
        </FollowMinusButton>
      </FollowSubGridBox>
      {/* </FollowGridBox> */}
    </FollowCardBox>
  );
};

export default FollowCard;
