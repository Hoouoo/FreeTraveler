import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PWPlaceBoxGenerator from "./generator/PWPlaceBoxGenerator";
import PostButton from "./buttons/PostButton";

const PWDayBoxTemplate = styled.div`
  width: auto;
  height: auto;
  margin: 50px;
  background-color: lightgreen;
  list-style: none;
  padding-top: 0px;
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  overflow-x: hidden;
  overflow-y: hidden;
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

export default function PWDayBox({ id, day, pgen }) {
  var [places, setPlaces] = useState();
  var [gen, setGen] = useState(new PWPlaceBoxGenerator(places, setPlaces));
  var [init, setInit] = useState(false);

  //초기 한번만 실행
  if (init == false) {
    pgen._genArray.push(gen);
    setInit(true);
  }

  const placeAddAction = function () {
    gen.addBox({ did: id });
    setPlaces(gen.render());
  };

  return (
    <div id={day}>
      <button onClick={() => gen.getData()}>함 보여바라!</button>
      <PWDayBoxTemplate>
        {day} 일차
        <PlaceAddBtn type="button" onClick={() => placeAddAction()}>
          장소 추가
        </PlaceAddBtn>
        {places}
      </PWDayBoxTemplate>
    </div>
  );
}
