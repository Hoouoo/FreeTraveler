import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { changeField } from "../../../module/posting";
import placelogo from "../../../resource/img/placelogo2.png";
import Button from "../buttons/DayButton";
import { FormControl, TextField, NativeSelect } from "@mui/material";
import DaumPostcode from "react-daum-postcode";
import { IoSearchSharp } from "react-icons/io5";

const PWPlaceBoxTemplate = styled.div`
  width: auto;
  margin: 15px;
  background-color: white;

  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);

  padding: 1.1rem;
  border-width: 0px;
  border-style: solid;
  border-bottom-left-radius: 0.4rem;
  border-bottom-right-radius: 0.4rem;
  overflow-x: hidden;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;

  .logo {
    width: 100px;
    height: auto;
    margin-left: -13px;
    margin-bottom: 10px;
  }

  .button {
    width: 60%;
    margin-top: 15px;
    padding-left: 20%;
    padding-right: 20%;
  }

  @media screen and (max-width: 612px) {
    .button {
      width: 70%;
      margin-top: 15px;
      padding-left: 15%;
      padding-right: 15%;
    }
  }
  @media screen and (min-width: 1012px) {
    .button {
      width: 30%;
      margin-top: 15px;
      padding-left: 35%;
      padding-right: 35%;
    }
  }
`;

const PostCodeStyle = styled.div`
  left: 0px;
  top: 0px;
  width: 100%;
  @media screen and (max-width: 380px) {
    overflow: scroll;
  }
`;

const PostInputTitle = styled.div`
  text-align: left;
  margin-top: 1rem;
  margin-left: 0.5rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
  font-size: 0.9rem;
  width: 100%;
`;

const PostInput = styled.div`
  margin-left: 0.5rem;
  margin-right: 0.5rem;
`;

const PlaceRemoveBtn = styled.div`
  width: 100%;
  text-align: center;
`;

const PostPreviewImage = styled.div`
  width: 500px;
  height: auto;
  img {
    width: 100%;
    height: 100%;
  }
`;

const PostSelect = styled.select``;

const PostOption = styled.option``;

export default function PWPlaceBox({ did, pid, gen, data }) {
  let [previewImg, setPreviewImg] = useState();
  let [state, setState] = useState({
    name: "",
    loc: "",
    cost: "",
    img: "",
    content: "",
    trans: "",
  });

  const showImage = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setPreviewImg(reader.result);
        resolve();
      };
    });
  };

  useEffect(() => {
    //엘리멘트 가져오기
    if (data != null && data != undefined) {
      const name = document.getElementById(did + "_" + pid + "_name");
      const loc = document.getElementById(did + "_" + pid + "_loc");
      const cost = document.getElementById(did + "_" + pid + "_cost");
      const img = document.getElementById(did + "_" + pid + "_img");
      const content = document.getElementById(did + "_" + pid + "_content");
      const trans = document.getElementById(did + "_" + pid + "_trans");

      name.value = data.placeName;
      setAddressDetail(data.loc);
      cost.value = data.cost;
      content.value = data.content;
      setPreviewImg(data.img);
      trans.value = data.trans;

      setState({
        name: data.placeName,
        loc: data.loc,
        cost: data.cost,
        img: "",
        content: data.content,
        trans: data.trans,
      });
    }
  }, []);

  useEffect(() => {
    stateSave();
  }, [state]);

  const placeRemoveAction = function () {
    gen.remove(pid);
  };

  const stateSave = function () {
    gen._stateArray[pid] = state;
  };

  //인풋 변경 이벤트 핸들러
  const onChange = (e) => {
    const { value, name, files } = e.target;

    if (name == did + "_" + pid + "_name") {
      state.name = value;
      setState(state);
    } else if (name == did + "_" + pid + "_loc") {
      state.loc = value;
      setState(state);
    } else if (name == did + "_" + pid + "_cost") {
      state.cost = value;
      setState(state);
    } else if (name == did + "_" + pid + "_img") {
      state.img = files != undefined ? files : "";
      setState(state);
      showImage(files[0]);
    } else if (name == did + "_" + pid + "_content") {
      state.content = value;
      setState(state);
    } else if (name == did + "_" + pid + "_trans") {
      state.trans = value;
      setState(state);
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

  //우편번호
  const [address, setAddress] = useState(""); // 주소
  const [addressDetail, setAddressDetail] = useState(""); // 상세주소

  const [isOpenPost, setIsOpenPost] = useState(false);

  const onChangeOpenPost = () => {
    setIsOpenPost(!isOpenPost);
  };

  const onClosePost = () => {
    setIsOpenPost(false);
  };

  const onCompletePost = (data) => {
    let fullAddr = data.address;
    let extraAddr = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddr += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddr +=
          extraAddr !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddr += extraAddr !== "" ? ` (${extraAddr})` : "";
    }

    setAddress(data.zonecode);
    setAddressDetail(fullAddr);
    setIsOpenPost(false);
  };

  return (
    <PWPlaceBoxTemplate>
      <img className="logo" src={placelogo} />
      <PostInputTitle>이름</PostInputTitle>
      <PostInput>
        <TextField
          fullWidth
          id={did + "_" + pid + "_name"}
          name={did + "_" + pid + "_name"}
          type="text"
          placeholder="ex) 가게명, 명소명"
          onChange={onChange}
          variant="standard"
          onClick={() => onClosePost()}
        />
      </PostInput>

      <PostInputTitle>위치</PostInputTitle>
      <PostInput>
        <TextField
          fullWidth
          id={did + "_" + pid + "_loc"}
          name={did + "_" + pid + "_loc"}
          type="text"
          placeholder="위치"
          value={addressDetail}
          onChange={onChange}
          variant="standard"
          onClick={() => {
            onChangeOpenPost();
          }}
        />
        {isOpenPost ? (
          <PostCodeStyle>
            <DaumPostcode autoClose onComplete={onCompletePost} />
          </PostCodeStyle>
        ) : null}
      </PostInput>

      <PostInputTitle>비용</PostInputTitle>
      <PostInput>
        <TextField
          fullWidth
          id={did + "_" + pid + "_cost"}
          name={did + "_" + pid + "_cost"}
          type="text"
          placeholder="비용"
          onChange={onChange}
          variant="standard"
          onClick={() => onClosePost()}
        />
      </PostInput>

      <PostInputTitle>사진</PostInputTitle>
      <PostPreviewImage>
        <img src={previewImg} />
      </PostPreviewImage>
      <PostInput>
        <TextField
          fullWidth
          id={did + "_" + pid + "_img"}
          name={did + "_" + pid + "_img"}
          type="file"
          placeholder="사진"
          onChange={onChange}
          variant="outlined"
          onClick={() => onClosePost()}
          accept="image/*"
        ></TextField>
      </PostInput>

      <PostInputTitle>내용</PostInputTitle>
      <PostInput>
        <TextField
          fullWidth
          id={did + "_" + pid + "_content"}
          name={did + "_" + pid + "_content"}
          type="text"
          placeholder="내용"
          onChange={onChange}
          variant="standard"
          onClick={() => onClosePost()}
        ></TextField>
      </PostInput>

      <PostInputTitle>이동수단</PostInputTitle>
      <PostInput>
        <FormControl fullWidth>
          <NativeSelect
            id={did + "_" + pid + "_trans"}
            name={did + "_" + pid + "_trans"}
            onChange={onChange}
            onClick={() => onClosePost()}
            defaultValue="none"
          >
            <option value="none">----</option>
            <option value="walk">도보</option>
            <option value="public">대중교통</option>
            <option value="car">자차</option>
          </NativeSelect>
        </FormControl>
      </PostInput>
      <div className="button">
        <Button type="button" onClick={() => placeRemoveAction()}>
          <PlaceRemoveBtn>삭제</PlaceRemoveBtn>
        </Button>
      </div>
    </PWPlaceBoxTemplate>
  );
}