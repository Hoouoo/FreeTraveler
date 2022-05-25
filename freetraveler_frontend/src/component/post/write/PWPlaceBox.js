import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { changeField, savePostIntegrity } from "../../../module/posting";
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
  justify-content: center;
  align-self: center;
  align-content: center;
  width: 500px;
  height: auto;
  img {
    width: 100%;
    height: 100%;
  }
`;

const PostSelect = styled.select``;

const PostOption = styled.option``;

const ErrorMesageBox = styled.div`
  color: red;
  margin-bottom: 20px;
  font-size: 10pt;
`;

export default function PWPlaceBox({ did, pid, gen, data }) {
  let [previewImg, setPreviewImg] = useState();
  let [state, setState] = useState({
    name: "",
    loc: "",
    cost: "",
    img: "",
    content: "",
    trans: "",
    integrity: false,
  });
  let [integrityUnit, setIntegrityUnit] = useState({
    name: false,
    loc: false,
    cost: false,
    img: false,
    content: false,
    trans: false,
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
        img: true,
        content: data.content,
        trans: data.trans,
      });
    }
  }, []);

  let [nameIntegrity, setNameIntegrity] = useState(null);
  let [locIntegrity, setLocIntegrity] = useState(null);
  let [costIntegrity, setCostIntegerity] = useState(null);
  let [imgIntegrity, setImgIntegrity] = useState(null);
  let [contentIntegrity, setContentIntegrity] = useState(null);
  let [transIntegrity, setTransIntegrity] = useState(null);

  useEffect(() => {
    {
      if (state.name.length > 0) {
        const temp = integrityUnit;
        temp.name = true;
        setIntegrityUnit(temp);
        setNameIntegrity(null);
      } else {
        const temp = integrityUnit;
        temp.name = false;
        setIntegrityUnit(temp);
        setNameIntegrity("이름을 입력 해주세요.");
      }
    }
    {
      if (state.loc.length > 1) {
        const temp = integrityUnit;
        temp.loc = true;
        setIntegrityUnit(temp);
        setLocIntegrity(null);
      } else {
        const temp = integrityUnit;
        temp.loc = false;
        setIntegrityUnit(temp);
        setLocIntegrity("주소를 입력 해주세요");
      }
    }
    {
      let pass = false;
      const regex = /^[0-9]{0,}$/;
      pass = state.cost.length > 0;
      pass = pass && regex.test(state.cost);
      if (pass) {
        const temp = integrityUnit;
        temp.cost = true;
        setIntegrityUnit(temp);
        setCostIntegerity(null);
      } else {
        const temp = integrityUnit;
        temp.cost = false;
        setIntegrityUnit(temp);
        setIntegrityUnit({ ...integrityUnit, cost: false });
        setCostIntegerity("가격을 숫자로 입력해주세요.");
      }
    }
    {
      let pass = false;
      pass = state.img == true || state.img != "";
      if (pass) {
        const temp = integrityUnit;
        temp.img = true;
        setIntegrityUnit(temp);
        setImgIntegrity(null);
      } else {
        const temp = integrityUnit;
        temp.img = false;
        setIntegrityUnit(temp);
        setIntegrityUnit({ ...integrityUnit, img: false });
        setImgIntegrity("이미지를 첨부해주세요.");
      }
    }
    {
      let pass = false;
      pass = state.content.length > 0;
      if (pass) {
        const temp = integrityUnit;
        temp.content = true;
        setIntegrityUnit(temp);
        setContentIntegrity(null);
      } else {
        const temp = integrityUnit;
        temp.content = false;
        setIntegrityUnit({ ...integrityUnit, content: false });
        setContentIntegrity("내용을 입력해주세요.");
      }
    }
    {
      let pass = false;
      pass = state.trans != "none" && state.trans != "";
      if (pass) {
        const temp = integrityUnit;
        temp.trans = true;
        setIntegrityUnit(temp);
        setTransIntegrity(null);
      } else {
        const temp = integrityUnit;
        temp.trans = false;
        setIntegrityUnit(temp);
        setTransIntegrity("교통수단을 선택해주세요.");
      }
    }
    stateSave();
  }, [state]);

  useEffect(() => {
    console.log(integrityUnit);
    const pass =
      integrityUnit.name != false &&
      integrityUnit.loc != false &&
      integrityUnit.cost != false &&
      integrityUnit.img != false &&
      integrityUnit.content != false &&
      integrityUnit.trans != false;
    const temp = state;
    temp.integrity = pass;
    setState(temp);
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
      setState({ ...state, name: value });
    } else if (name == did + "_" + pid + "_loc") {
      setState({ ...state, loc: value });
    } else if (name == did + "_" + pid + "_cost") {
      setState({ ...state, cost: value });
    } else if (name == did + "_" + pid + "_img") {
      setState({ ...state, img: files != undefined ? files : "" });
      showImage(files[0]);
    } else if (name == did + "_" + pid + "_content") {
      setState({ ...state, content: value });
    } else if (name == did + "_" + pid + "_trans") {
      setState({ ...state, trans: value });
    }

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
    setState({ ...state, loc: fullAddr });
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
      {/* 무결성 에러 표시 */}
      {nameIntegrity != null && (
        <ErrorMesageBox>{nameIntegrity}</ErrorMesageBox>
      )}

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
      {/* 무결성 에러 표시 */}
      {locIntegrity != null && <ErrorMesageBox>{locIntegrity}</ErrorMesageBox>}

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
      {/* 무결성 에러 표시 */}
      {costIntegrity != null && (
        <ErrorMesageBox>{costIntegrity}</ErrorMesageBox>
      )}

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
      {/* 무결성 에러 표시 */}
      {imgIntegrity != null && <ErrorMesageBox>{imgIntegrity}</ErrorMesageBox>}

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
      {/* 무결성 에러 표시 */}
      {contentIntegrity != null && (
        <ErrorMesageBox>{contentIntegrity}</ErrorMesageBox>
      )}

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
      {/* 무결성 에러 표시 */}
      {transIntegrity != null && (
        <ErrorMesageBox>{transIntegrity}</ErrorMesageBox>
      )}

      <div className="button">
        <Button type="button" onClick={() => placeRemoveAction()}>
          <PlaceRemoveBtn>삭제</PlaceRemoveBtn>
        </Button>
      </div>
    </PWPlaceBoxTemplate>
  );
}
