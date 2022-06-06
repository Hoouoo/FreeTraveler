import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModifyLogCard from "../modify_list/ModifyLogCard";
import { faPlus, faUserMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModifyLogCardGenerator from "../modify_list/generator/ModifyLogCardGenerator";
import styled from "styled-components";
import palette from "../../lib/styles/palette";
import { getModifyList } from "../../module/posting";
import { useHistory } from "react-router-dom";
import qs from "qs";

const ModifyListBox = styled.div`
  width: auto;
  min-height: 1vh;
  height: 100%;
  padding: 35px;
  margin-top: -10px;
  margin-left: 10%;
  margin-right: 10%;
  background-color: white;
  @media screen and (max-width: 612px) {
    padding-top: 35px;
    margin-top: -10px;
    margin-left: 0;
    margin-right: 0;
  }
`;

const TitleText = styled.div`
  font-size: 20px;
  font-weight: 700;
  line-height: 1.9rem;
  color: ${palette.gray[13]};
  @media screen and (max-width: 612px) {
    font-size: 15px;
  }
`;

const ModifyGridBox = styled.div`
  /* @media screen and (min-width: 612px) {
    display: grid;
    grid-template-columns: 33% 33% 33%;
    justify-content: center;
    align-items: center;
    padding: 1px;
  }
  @media screen and (min-width: 1200px) {
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
    justify-content: center;
    align-items: center;
    padding: 1px;
  } */
`;

export default function ModifyListContainer() {
  let [gen, setGen] = useState(new ModifyLogCardGenerator());
  let [render, setRender] = useState(gen.render());
  let [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();
  const { user, modifyList } = useSelector(({ post, user }) => ({
    modifyList: post.modifyList,
    user: user.user,
  }));

  const getData = () => {
    const query = qs.parse(history.location.search, {
      ignoreQueryPrefix: true, // 물음표를 제거하고 받아오기 위해서
    });

    const boardId = query.id;

    dispatch(getModifyList({ id: boardId }));
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    gen.clear();
    setRender(gen.render());
    if (
      modifyList != undefined &&
      modifyList != null &&
      JSON.stringify(modifyList) != "{}"
    ) {
      for (let i = 0; i < modifyList.list.length; i++) {
        gen.addFollowCard({
          id: modifyList.list[i].id,
          time: modifyList.list[i].time,
          gen: gen,
        });
      }
      setRender(gen.render());
    }
  }, [modifyList]);

  return (
    <>
      <ModifyListBox>
        <TitleText>수정 로그</TitleText>
        <ModifyGridBox>
          <ModifyLogCard />
          <ModifyLogCard />
          <ModifyLogCard />
          <ModifyLogCard />
          {render}
        </ModifyGridBox>
      </ModifyListBox>
    </>
  );
}
