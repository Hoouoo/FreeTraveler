import React from "react";
import styled from "styled-components";
import palette from "../../lib/styles/palette";
import { BsArrowReturnRight } from "react-icons/bs";

const ModifyLogCardBox = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 3px ${palette.gray[12]};
  /* border: 1px solid ${palette.gray[12]}; */
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 1%;
  /* padding-right: 45%; */
  margin: 10px;
`;

const ModifyGridBox = styled.div`
  display: grid;
  grid-template-columns: 2% 98%;
  justify-content: center;
  align-items: center;
  padding: 1px;
  @media screen and (max-width: 612px) {
    grid-template-columns: 5% 95%;
  }
`;

const ModifyIdText = styled.text`
  text-align: left;
  font-size: 15px;
  font-weight: 400;
  margin-bottom: 8px;
  label {
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 8px;
  }
`;

const ModifyTimeText = styled.div`
  font-size: 15px;
  font-weight: 400;
  /* margin-bottom: 8px; */
  label {
    font-size: 15px;
    font-weight: 600;
    /* margin-bottom: 8px; */
  }
`;

export default function ModifyLogCard({ time = "1999.99.99", id = "id" }) {
  return (
    <>
      <ModifyGridBox>
        <BsArrowReturnRight size="20" color="#000" />
        <ModifyLogCardBox>
          <ModifyIdText>
            <label>사용자 ID | </label>
            {id}
          </ModifyIdText>
          <ModifyTimeText>
            <label>시간 | </label>
            {time}
          </ModifyTimeText>
        </ModifyLogCardBox>
      </ModifyGridBox>
    </>
  );
}
