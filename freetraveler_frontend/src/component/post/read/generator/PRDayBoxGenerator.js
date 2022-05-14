import React from "react";
import styled from "styled-components";
import PRDayBox from "../PRDayBox";

const NoDotUl = styled.ul`
  list-style: none;
`;

class PRDayBoxGenerator {
  constructor() {
    this._array = new Array();
    this._genArray = new Array();
    this._index = -1;
  }

  //단일 아이템 카드 삽입
  addBox(box) {
    this._index++;
    this._array.push(
      <PRDayBox
        key={this._index}
        id={box.id}
        day={box.day}
        pgen={box.gen}
        data={box.data}
      />
    );
  }

  //아이템 카드 배열 삽입
  addBoxArray(array) {
    array.forEach((box) => {
      this._index++;
      this._array.push(
        <PRDayBox
          key={this._index}
          id={box.id}
          day={box.day}
          pgen={box.gen}
          data={box.data}
        />
      );
    });
  }

  removeTop() {
    this._array.pop();
    this._genArray.pop();
    this._index--;
  }

  // remove(id) {
  //   this._array = this._array.filter((e) => {
  //     if (!(e.id == id)) {
  //       return true;
  //     }
  //   });
  // }

  //아이템 리스트 초기화
  clear() {
    this._array = null;
    this._array = new Array();
  }

  //렌더링
  render() {
    return <NoDotUl className="pw_day_box_list">{this._array}</NoDotUl>;
  }
}

export default PRDayBoxGenerator;
