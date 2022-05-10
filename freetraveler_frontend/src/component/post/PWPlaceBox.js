import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { changeField } from "../../module/posting";

const PWPlaceBoxTemplate = styled.div`
  width: auto;
  margin: 15px;
  background-color: lightgray;
`;

const PostInput = styled.input`
  font-size: 15px;
  margin: 5px;
`;

const PlaceRemoveBtn = styled.button`
  width: 150px;
`;

const PostSelect = styled.select``;

const PostOption = styled.option``;

export default function PWPlaceBox({ did, pid, gen }) {
  //const stateName = did + "_" + pid + "_state";
  let state = {
    // [stateName]: {
    name: "",
    loc: "",
    cost: "",
    img: "",
    content: "",
    trans: "",
    // },
  };

  const placeRemoveAction = function () {
    gen.remove(pid);
  };

  const stateSave = function () {
    gen._stateArray[pid] = state;
  };

  //인풋 변경 이벤트 핸들러
  const onChange = (e) => {
    const { value, name, files } = e.target;

    // if (name == did + "_" + pid + "_name") {
    //   state[stateName].name = value;
    // } else if (name == did + "_" + pid + "_loc") {
    //   state[stateName].loc = value;
    // } else if (name == did + "_" + pid + "_cost") {
    //   state[stateName].cost = value;
    // } else if (name == did + "_" + pid + "_img") {
    //   state[stateName].img = files;
    // } else if (name == did + "_" + pid + "_content") {
    //   state[stateName].content = value;
    // } else if (name == did + "_" + pid + "_trans") {
    //   state[stateName].trans = value;
    // }

    if (name == did + "_" + pid + "_name") {
      state.name = value;
    } else if (name == did + "_" + pid + "_loc") {
      state.loc = value;
    } else if (name == did + "_" + pid + "_cost") {
      state.cost = value;
    } else if (name == did + "_" + pid + "_img") {
      state.img = files;
    } else if (name == did + "_" + pid + "_content") {
      state.content = value;
    } else if (name == did + "_" + pid + "_trans") {
      state.trans = value;
    }

    stateSave();

    // if (type != "file") {
    //   dispatch(
    //     changeField({
    //       form: "post",
    //       key: name,
    //       value,
    //     })
    //   );
    // } else {
    //   dispatch(
    //     changeField({
    //       form: "post",
    //       key: name,
    //       value: files[0],
    //     })
    //   );
    // }
  };

  return (
    <PWPlaceBoxTemplate>
      <div>{pid}</div>
      <PostInput
        name={did + "_" + pid + "_name"}
        type="text"
        placeholder="이름"
        onChange={onChange}
      ></PostInput>
      <PostInput
        name={did + "_" + pid + "_loc"}
        type="text"
        placeholder="위치"
        onChange={onChange}
      ></PostInput>
      <PostInput
        name={did + "_" + pid + "_cost"}
        type="text"
        placeholder="비용"
        onChange={onChange}
      ></PostInput>
      <PostInput
        name={did + "_" + pid + "_img"}
        type="file"
        placeholder="사진"
        onChange={onChange}
      ></PostInput>
      <PostInput
        name={did + "_" + pid + "_content"}
        type="text"
        placeholder="내용"
        onChange={onChange}
      ></PostInput>
      <PostSelect name={did + "_" + pid + "_trans"} onChange={onChange}>
        <PostOption value="none">----</PostOption>
        <PostOption value="walk">도보</PostOption>
        <PostOption value="public">대중교통</PostOption>
        <PostOption value="car">자차</PostOption>
      </PostSelect>
      <PlaceRemoveBtn onClick={() => placeRemoveAction()}>삭제</PlaceRemoveBtn>
    </PWPlaceBoxTemplate>
  );
}
