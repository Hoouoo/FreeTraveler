import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FollowCard from "../../component/list/FollowCard";
import { getFollowList } from "../../module/follow";
import { faPlus, faUserMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FollowCardGenerator from "./generator/FollowGenerator";
import styled from "styled-components";
import palette from "../../lib/styles/palette";

const FollowBox = styled.div`
  width: auto;
  height: 100%;
  padding: 35px;
  margin-top: -10px;
  margin-left: 10%;
  margin-right: 10%;
  background-color: white;
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

export default function FollowContainer() {
  let [gen, setGen] = useState(new FollowCardGenerator());
  let [render, setRender] = useState(gen.render());

  const dispatch = useDispatch();
  const { followList, user } = useSelector(({ follow, user }) => ({
    followList: follow.getFollowList,
    user: user.user,
  }));

  const getData = () => {
    if (user != null) {
      dispatch(getFollowList({ id: user.userId }));
    }
  };

  const searchButtonClick = () => {};
  useEffect(() => {
    getData();
    gen.addFollowCard({
      id: 1,
      name: "사람",
      gen: gen,
    });
    setRender(gen.render());
  }, []);

  useEffect(() => {
    if (
      followList != undefined &&
      followList != null &&
      JSON.stringify(followList) != "{}"
    ) {
      for (let i = 0; i < followList.list.length; i++) {
        gen.addFollowCard({
          id: followList.id,
          name: followList.name,
          gen: gen,
        });
      }
      setRender(gen.render());
    }
  }, [followList]);

  return (
    <div>
      <FollowBox>
        <SearchBox>
          <SearchButton onClick={() => searchButtonClick()}>
            <FontAwesomeIcon icon={faPlus} />
          </SearchButton>
          <SearchInput placeholder=" 팔로우 대상" />
        </SearchBox>
        <FollowGridBox>
          <FollowCard />
          {render}
        </FollowGridBox>
      </FollowBox>
    </div>
  );
}
