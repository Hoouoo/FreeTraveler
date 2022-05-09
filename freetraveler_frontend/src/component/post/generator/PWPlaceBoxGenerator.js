import React from "react";
import styled from "styled-components";
import PWDayBox from "../PWDayBox";
import PWPlaceBox from "../PWPlaceBox";

const NoDotUl = styled.ul`
  list-style: none;
`;

class PWPlaceBoxGenerator {
  constructor(places, setPlaces) {
    this._array = new Array();
    this.places = places;
    this.setPlaces = setPlaces;
  }

  //단일 아이템 카드 삽입
  addBox(box) {
    this._array.push(
      <li key={box.id} id={"pw_place_box_" + box.id}>
        <PWPlaceBox id={box.id} gen={this} />
      </li>
    );

    this.setPlaces(this.render());
  }

  //아이템 카드 배열 삽입
  addBoxArray(array) {
    array.forEach((box) => {
      this._array.push(
        <li key={box.id} id={"pw_place_box_" + box.id}>
          <PWPlaceBox id={box.id} gen={this} />
        </li>
      );
    });

    this.setPlaces(this.render());
  }

  removeTop() {
    this._array.pop();

    this.setPlaces(this.render());
  }

  remove(id) {
    this._array = this._array.filter((e) => {
      if (!(e.key == id)) {
        return true;
      } else {
        return false;
      }
    });

    this.setPlaces(this.render());
  }

  //아이템 리스트 초기화
  clear() {
    this._array = null;
    this._array = new Array();
  }

  //렌더링
  render() {
    return <NoDotUl className="pw_place_box_list">{this._array}</NoDotUl>;
  }
}

export default PWPlaceBoxGenerator;
