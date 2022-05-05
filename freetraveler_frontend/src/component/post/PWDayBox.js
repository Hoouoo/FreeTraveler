import React, { useState } from "react";
import styled from "styled-components";
import PWPlaceBoxGenerator from "./generator/PWPlaceBoxGenerator";

const PWDayBoxTemplate = styled.div`
  width: auto;
  margin: 50px;
  background-color: lightgreen;
  list-style: none;
`;

const PWForm = styled.form`
  width: auto;
  height: 100%;
  padding: 25px;
  text-align: center;
`;

const PostInput = styled.input`
  font-size: 15px;
  margin: 5px;
`;

const PlaceAddBtn = styled.button`
  width: 150px;
`;

const PlaceRemoveBtn = styled.button`
  width: 150px;
`;

export default function PWDayBox({ id, day }) {
  var [gen, setGen] = useState(new PWPlaceBoxGenerator());
  var [places, setPlaces] = useState(gen.render());
  var [placeIndex, setPlaceIndex] = useState(0);

  const placeAddAction = function () {
    gen.addBox({ id: placeIndex });
    setPlaceIndex(++placeIndex);
    setPlaces(gen.render());
  };

  const placeRemoveAction = function () {
    if (placeIndex >= 0) {
      gen.removeTop();
      setPlaceIndex(--placeIndex);
      setPlaces(gen.render());
    }
  };

  return (
    <PWDayBoxTemplate>
      {day} 일차
      <PlaceAddBtn onClick={() => placeAddAction()}>장소 추가</PlaceAddBtn>
      <PWForm></PWForm>
      {places}
    </PWDayBoxTemplate>
  );
}
