import React from "react";
import styled from "styled-components";

const PWPlaceBoxTemplate = styled.div`
  width: auto;
  margin: 15px;
  background-color: lightgreen;
`;

const PWForm = styled.form`
  width: auto;
  height: auto;
  padding: 15px;
`;

const PostInput = styled.input`
  font-size: 15px;
  margin: 5px;
`;

const PostSelect = styled.select``;

const PostOption = styled.option``;

export default function PWPlaceBox({ id }) {
  return (
    <PWPlaceBoxTemplate>
      <PWForm>
        <PostInput type="text" placeholder="이름"></PostInput>
        <PostInput type="text" placeholder="위치"></PostInput>
        <PostInput type="text" placeholder="비용"></PostInput>
        <PostInput type="file" placeholder="사진"></PostInput>
        <PostInput type="text" placeholder="내용"></PostInput>
        <PostSelect>
          <PostOption value="walk">도보</PostOption>
          <PostOption value="public">대중교통</PostOption>
          <PostOption value="car">자차</PostOption>
        </PostSelect>
      </PWForm>
    </PWPlaceBoxTemplate>
  );
}
