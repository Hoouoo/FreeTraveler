import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FollowCard from "../../component/list/FollowCard";
import { addFollow, getFollowList } from "../../module/follow";
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
  let [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const { loading, followList, user, loadingAdd, loadingRemove } = useSelector(
    ({ follow, user, loading }) => ({
      loadingAdd: loading.follow_ADD_FOLLOW,
      loadingRemove: loading.follow_REMOVE_FOLLOW,
      followList: follow.getFollowList,
      user: user.user,
    })
  );

  const getData = () => {
    if (user != null) {
      dispatch(getFollowList({ id: user.userId }));
    }
  };

  const searchButtonClick = (e) => {
    e.preventDefault();
    dispatch(addFollow({ id: search }));
  };
  useEffect(() => {
    getData();
  }, [loadingAdd, loadingRemove]);

  useEffect(() => {
    gen.clear();
    setRender(gen.render());
    if (
      followList != undefined &&
      followList != null &&
      JSON.stringify(followList) != "{}"
    ) {
      for (let i = 0; i < followList.list.length; i++) {
        gen.addFollowCard({
          id: followList.list[i].id,
          name: followList.list[i].name,
          gen: gen,
        });
      }
      setRender(gen.render());
    }
  }, [followList]);

  const onChange = (e) => {
    let { name, value } = e.target;
    if (name == "searchInput") {
      setSearch(value);
    }
  };

  return (
    <div>
      <FollowBox>
        <SearchBox>
          <form onSubmit={(e) => searchButtonClick(e)}>
            <SearchButton>
              <FontAwesomeIcon icon={faPlus} />
            </SearchButton>
            <SearchInput
              name="searchInput"
              value={search}
              onChange={onChange}
              placeholder=" 팔로우 대상"
            />
          </form>
        </SearchBox>

        <FollowGridBox>{render}</FollowGridBox>
      </FollowBox>
    </div>
  );
}
