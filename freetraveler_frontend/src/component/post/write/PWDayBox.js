import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PWPlaceBoxGenerator from "./generator/PWPlaceBoxGenerator";
import PostButton from "../buttons/PostButton";
import { IoIosAddCircleOutline } from "react-icons/io";
import palette from "../../../lib/styles/palette";

const PWDayBoxTemplate = styled.div`
  /* width: auto;
  height: auto;
  margin: 50px;
  background-color: lightgreen;
  list-style: none;
  padding-top: 0px;
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  overflow-x: hidden;
  overflow-y: hidden; */
  /* margin: 50px; */
  margin-left: -40px;
  margin-bottom: 20px;
  min-height: 90vh;
  background-color: white;

  padding-top: 4rem;
  padding-left: 1.2rem;
  padding-right: 1.2rem;
  padding-bottom: 1.2rem;
  border-width: 0.1px;
  border-style: solid;
  border-color: ${palette.gray[3]};
  border-top-width: 0.1px;
  border-radius: 0.2rem;
  overflow-x: hidden;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  @supports (-webkit-touch-callout: none) {
    min-height: -webkit-fill-available;
  }

  @media screen and (max-width: 612px) {
    margin-left: -90px;
    margin-right: -50px;
    padding-left: 0.8rem;
    padding-right: 0.8rem;
    padding-bottom: 0.8rem;
  }
`;

const DayTitleLine = styled.div`
  justify-content: space-between;
`;

const DayTitle = styled.div`
  padding-left: 1rem;
  float: left;
  font-size: 1.3rem;
  font-weight: 700;
  line-height: 1.9rem;
  /* color: rgb(26, 26, 26); */
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

const PlaceAddBtn = styled.div`
  padding-top: 4px;
  padding-right: 1rem;
  text-align: center;
  color: ${palette.gray[10]};
  justify-content: center;
  align-content: center;
  cursor: pointer;
`;

export default function PWDayBox({ id, day, pgen, data }) {
  var [places, setPlaces] = useState();
  var [gen, setGen] = useState(new PWPlaceBoxGenerator(places, setPlaces));
  var [init, setInit] = useState(false);

  useEffect(() => {
    pgen._genArray.push(gen);
    if (data != undefined && data != null && JSON.stringify(data) != "{}") {
      for (let i = 0; i < data.length; i++) {
        gen.addBox({ did: id, data: data[i] });
        setPlaces(gen.render());
      }
    }
  }, []);

  const placeAddAction = function () {
    gen.addBox({ did: id });
    setPlaces(gen.render());
  };

  return (
    <div id={day}>
      {/* <button onClick={() => gen.getData()}>함 보여바라!</button> */}
      <PWDayBoxTemplate>
        <DayTitleLine>
          <DayTitle>{day} DAY</DayTitle>
        </DayTitleLine>
        {places}
        <PlaceAddBtn>
          <IoIosAddCircleOutline
            size="30"
            type="button"
            onClick={() => placeAddAction()}
          ></IoIosAddCircleOutline>
        </PlaceAddBtn>
      </PWDayBoxTemplate>
    </div>
  );
}
