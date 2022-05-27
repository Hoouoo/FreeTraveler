import React, { useEffect, useReducer, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  post,
  changeField,
  clearModBuffer,
  getPostClear,
} from "../../../module/posting";
import PWDayBoxGenerator from "./generator/PWDayBoxGenerator";
import PostTemplate from "../PostTemplate";
import palette from "../../../lib/styles/palette";
import { Link } from "react-scroll";
import { IoIosArrowUp } from "react-icons/io";
import DayButton from "../buttons/DayButton";
import PostButton from "../buttons/PostSubButton";

const POWBox = styled.div`
  width: auto;
  height: 100%;
  padding: 35px;
  margin-top: -10px;
  margin-left: 10%;
  margin-right: 10%;
  background-color: white;
  @media screen and (max-width: 612px) {
    margin-left: 10px;
    margin-right: 10px;
    padding: 0px;
  }
`;

const PWOABox = styled.div`
  width: auto;
  height: 90vh;
  padding: 35px;
  margin-top: -10px;
  margin-left: 10%;
  margin-right: 10%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 612px) {
    margin-left: 10px;
    margin-right: 10px;
    padding: 0px;
  }
`;

const PWDayBox = styled.div``;

const PWForm = styled.form`
  width: auto;
  /* padding: 50px; */
  margin-top: -10px;
  margin-left: 10%;
  margin-right: 10%;
  margin-bottom: 30px;
  text-align: center;

  @media screen and (max-width: 612px) {
    margin-left: 15%;
    margin-right: 15%;
  }
  /* background-color: white; */
  /* width: auto;
  height: 100%;
  padding: 50px;
  text-align: center; */
`;

const ScrollBar = styled.div`
  cursor: pointer;
  justify-content: center;
  align-items: flex-end;
  align-content: center;
  position: fixed;
  right: 1.2rem;
  bottom: 40%;
  z-index: 10;
  transform: translateY(-5rem);
  transition-duration: 0.25s, 0.25s;
  transition-timing-function: cubic-bezier(0.75, 0.25, 0.25, 0.75),
    cubic-bezier(0.75, 0.25, 0.25, 0.75);
  transition-delay: initial, initial;
  transition-property: transform, transform;
`;

const PostInput = styled.input`
  font-size: 15px;
  margin: 0 40px 6px;
  outline-color: ${palette.mint[0]};
  border-color: ${palette.mint[0]};
  border: none;
  width: 100%;
  height: 30px;
  margin-left: 0.5rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid ${palette.mint[0]};
  /* border: 1px solid rgba(var(--c8c, 168, 168, 168), 1); */
  @media screen and (max-width: 612px) {
    text-align: left;
    width: 60%;
  }
`;

const TitleInput = styled.input`
  outline: none;
  border: none;
  font-size: 2rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${palette.gray[4]};
  margin-bottom: 1rem;
  width: 100%;
`;

const PostObjectTitle = styled.div`
  text-align: left;
  margin-left: 0.5rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
  font-size: 1rem;
  width: 100%;
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

const BtnBox = styled.div`
  width: 100%;
  text-align: center;
`;

const ErrorMesageBox = styled.div`
  color: red;
  margin-bottom: 20px;
  font-size: 10pt;
`;

export default function PostWriteForm({ id, mode }) {
  var [gen, setGen] = useState(new PWDayBoxGenerator());
  var [days, setDays] = useState(gen.render());
  var [dayIndex, setDayIndex] = useState(0);

  var [repImg, setRepImg] = useState("");
  var [repImgPreview, setRepImagePreview] = useState("");
  var [postName, setPostName] = useState("");
  var [totalCost, setTotalCost] = useState("");
  var [totalDays, setTotalDays] = useState(0);
  var [totalTrans, setTotalTrans] = useState("");
  var [comment, setComment] = useState("");

  var [data, setData] = useState(null);

  const dispatch = useDispatch();
  const { modBuffer } = useSelector(({ post }) => ({
    modBuffer: post.modBuffer,
  }));

  let [postNameIntegrity, setPostNameIntegrity] = useState();
  let [totalCostIntegrity, setTotalCostIntegrity] = useState();
  let [totalTransIntegrity, setTotalTransIntegrity] = useState();
  let [commentIntegrity, setCommentIntegrity] = useState();
  let [repImgIntegrity, setImgIntegrity] = useState();

  const dataSetting = function () {};
  useEffect(() => {
    if (mode == "modify") {
      setData(modBuffer);
      //조회 폼 초기화
      dispatch(getPostClear());
    }
  }, []);

  useEffect(() => {
    if (mode == "modify") {
      if (data != undefined && data != null && JSON.stringify(data) != "{}") {
        const postName = document.getElementById("postName");
        const totalCost = document.getElementById("totalCost");
        const totalTrans = document.getElementById("totalTrans");
        const comment = document.getElementById("comment");

        postName.value = data.postName;
        totalCost.value = data.totalCost;
        totalTrans.value = data.totalTrans;
        comment.value = data.comment;
        setRepImagePreview(data.repimg);

        setPostName(data.postName);
        setTotalCost(data.totalCost);
        setTotalTrans(data.totalTrans);
        setComment(data.comment);
        setRepImg("exist");

        //day 박스 추가
        for (let i = 0; i < data.days.length; i++) {
          gen.addBox({
            id: dayIndex,
            day: dayIndex + 1,
            gen,
            data: data.days[i],
          });
          setDayIndex(++dayIndex);
          setTotalDays(++totalDays);
          setDays(gen.render());
        }
      }
    }
  }, [data]);

  const integrityTest = () => {
    {
      if (postName.length == 0) {
        setPostNameIntegrity("포스트 제목을 입력해주세요.");
      } else {
        setPostNameIntegrity(null);
      }
    }
    {
      if (totalCost.length == 0) {
        setTotalCostIntegrity("총 금액을 입력해주세요.");
      } else {
        setTotalCostIntegrity(null);
      }
    }
    {
      if (totalTrans.length == 0) {
        setTotalTransIntegrity("교통 수단을 입력해주세요.");
      } else {
        setTotalTransIntegrity(null);
      }
    }
    {
      if (comment.length == 0) {
        setCommentIntegrity("내용을 입력해주세요.");
      } else {
        setCommentIntegrity(null);
      }
    }
    {
      let dataImg = null;
      if (mode == "modify") {
        if (data != undefined && data != null && JSON.stringify(data) != "{}") {
          dataImg = data.repImg;
        }
      }
      if (repImg == "" && dataImg == null) {
        setImgIntegrity("사진을 첨부해주세요.");
      } else {
        setImgIntegrity(null);
      }
    }
  };

  useEffect(() => {
    integrityTest();
  }, [postName, totalCost, totalTrans, comment, repImg]);

  // //리모컨 scroll
  // const [scrollPosition, setScrollPosition] = useState(0);
  // const pageHeight = window.innerHeight;
  // const updateScroll = () => {
  //   setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  // };
  // useEffect(() => {
  //   window.addEventListener("scroll", updateScroll);
  // });

  const showImage = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setRepImagePreview(reader.result);
        resolve();
      };
    });
  };

  //인풋 변경 이벤트 핸들러

  const onChange = (event) => {
    const { value, name, files } = event.target;
    switch (name) {
      case "repImg":
        setRepImg(files[0]);
        showImage(files[0]);
        break;
      case "postName":
        setPostName(value);
        break;
      case "totalCost":
        setTotalCost(value);
        break;
      case "totalDays":
        setTotalDays(value);
        break;
      case "totalTrans":
        setTotalTrans(value);
        break;
      case "comment":
        setComment(value);
        break;
    }
  };

  const OABox = (
    <PWOABox>
      <PWForm>
        <TitleInput
          id="postName"
          name="postName"
          type="text"
          placeholder="포스트 제목"
          onChange={onChange}
        />
        {/* 무결성 에러 표시 */}
        {postNameIntegrity != null && (
          <ErrorMesageBox>{postNameIntegrity}</ErrorMesageBox>
        )}
        <PostObjectTitle> 여행 비용 </PostObjectTitle>
        <PostInput
          id="totalCost"
          name="totalCost"
          type="text"
          placeholder="여행 비용"
          onChange={onChange}
        />
        {/* 무결성 에러 표시 */}
        {totalCostIntegrity != null && (
          <ErrorMesageBox>{totalCostIntegrity}</ErrorMesageBox>
        )}
        <PostObjectTitle> 여행 일수 </PostObjectTitle>
        <PostInput
          id="totalDays"
          name="totalDays"
          type="text"
          placeholder="여행 일수"
          onChange={onChange}
          readOnly
        />
        <PostObjectTitle> 여행 방법 </PostObjectTitle>
        <PostInput
          id="totalTrans"
          name="totalTrans"
          type="text"
          placeholder="여행 방법"
          onChange={onChange}
        />
        {/* 무결성 에러 표시 */}
        {totalTransIntegrity != null && (
          <ErrorMesageBox>{totalTransIntegrity}</ErrorMesageBox>
        )}

        <PostObjectTitle> 대표 사진 </PostObjectTitle>
        <PostPreviewImage>
          <img id="repImg" src={repImgPreview} />
        </PostPreviewImage>
        <PostInput
          name="repImg"
          type="file"
          onChange={onChange}
          accept="image/*"
        />
        {/* 무결성 에러 표시 */}
        {repImgIntegrity != null && (
          <ErrorMesageBox>{repImgIntegrity}</ErrorMesageBox>
        )}

        <PostObjectTitle> 경험자의 한마디 </PostObjectTitle>
        <PostInput
          id="comment"
          name="comment"
          type="text"
          placeholder="경험자의 한마디"
          onChange={onChange}
        />
        {/* 무결성 에러 표시 */}
        {commentIntegrity != null && (
          <ErrorMesageBox>{commentIntegrity}</ErrorMesageBox>
        )}
      </PWForm>
    </PWOABox>
  );

  useEffect(() => {
    const totalDaysInput = document.getElementById("totalDays");
    totalDaysInput.value = totalDays;
  }, [totalDays]);

  const dayRender = () => {
    const dayInputIndex = [];
    for (let i = 1; i <= dayIndex; i++) {
      dayInputIndex.push(
        <Link to={i} spy={true} smooth={true}>
          <span key={i}>{i + " DAY"}</span>
          <br />
        </Link>
      );
    }
    return dayInputIndex;
  };

  const DBox = (
    <ScrollBar>
      {dayRender()}
      <Link to={"scrollup"} spy={true} smooth={false}>
        <IoIosArrowUp size="25" color="#000" />
      </Link>
    </ScrollBar>
  );

  const dayAddAction = function () {
    gen.addBox({ id: dayIndex, day: dayIndex + 1, gen });
    setDayIndex(++dayIndex);
    setDays(gen.render());
    setTotalDays(totalDays + 1);
  };

  const dayRemoveAction = function () {
    if (dayIndex > 0) {
      gen.removeTop();
      setDayIndex(--dayIndex);
      setDays(gen.render());
      setTotalDays(totalDays - 1);
    }
  };

  const testlog = function () {
    console.log("test");
  };

  // 폼 등록 이벤트 핸들러
  const onSubmit = async (e) => {
    e.preventDefault();
    let pass = true;
    pass = pass && gen.isIntegrity();
    pass = pass && postNameIntegrity == null;
    pass = pass && totalCostIntegrity == null;
    pass = pass && totalTransIntegrity == null;
    pass = pass && commentIntegrity == null;
    pass = pass && repImgIntegrity == null;

    if (pass) {
      var formData = gen.getFormData();
      formData.append("repImg", repImg);
      formData.append("postName", postName);
      formData.append("totalCost", totalCost);
      formData.append("totalDays", totalDays);
      formData.append("totalTrans", totalTrans);
      formData.append("comment", comment);

      if (mode == "write") {
        formData.append("mode", "write");
      } else if (mode == "modify") {
        formData.append("id", data.id);
        formData.append("mode", "modify");
      }

      dispatch(post(formData));
    } else {
      alert("양식을 다시 확인해주세요.");
    }
  };

  return (
    // <POWBox>
    <div id="scrollup">
      {OABox}
      <br />
      <PWForm method="post" onSubmit={onSubmit}>
        {DBox}
        {days}
        <DayButton type="button" onClick={() => dayAddAction()}>
          <BtnBox>하루 추가</BtnBox>
        </DayButton>
        <DayButton type="button" onClick={() => dayRemoveAction()}>
          <BtnBox>하루 삭제</BtnBox>
        </DayButton>

        <br />
        <PostButton type="submit">
          <BtnBox>제출하기</BtnBox>
        </PostButton>
      </PWForm>
    </div>
    // </POWBox>
  );
}
