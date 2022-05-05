import React from "react";
import styled from "styled-components";
import PWDayBox from "../PWDayBox";
import PWPlaceBox from "../PWPlaceBox";

const NoDotUl = styled.ul`
  list-style: none;
`;

class PWPlaceBoxGenerator {
  constructor() {
    this._array = new Array();
    this._index = -1;
  }

  //단일 아이템 카드 삽입
  addBox(box) {
    this._index++;
    this._array[this._index] = (
      <li key={this._index} id={"pw_place_box_" + box.id}>
        <PWPlaceBox id={box.id} />
      </li>
    );
  }

  //아이템 카드 배열 삽입
  addBoxArray(array) {
    this._index++;
    array.forEach((box) => {
      this._array[this._index] = (
        <li key={this._index} id={"pw_place_box_" + box.id}>
          <PWPlaceBox id={box.id} />
        </li>
      );
    });
  }

  removeTop() {
    if (this._index >= 0) {
      this._array[this._index] = null;
      this._index--;
    }
  }

  remove(id) {
    this._array = this._array.filter((e) => {
      if (!(e.id == id)) {
        this._index--;
        return true;
      }
    });
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
