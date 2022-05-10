import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PWPlaceBoxGenerator from "./generator/PWPlaceBoxGenerator";
import PostButton from "./buttons/PostButton";

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

export default function PWDayBox({ id, day }) {
  var [places, setPlaces] = useState();

  var [gen, setGen] = useState(new PWPlaceBoxGenerator(places, setPlaces));

  const placeAddAction = function () {
    gen.addBox({ did: id });
    setPlaces(gen.render());
  };

  return (
    <div id ={day}>
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
