import React from "react";
import styled from "styled-components";
import PWDayBox from "../PWDayBox";

const NoDotUl = styled.ul`
  list-style: none;
`;

class PWDayBoxGenerator {
  constructor() {
    this._array = new Array();
    this._genArray = new Array();
  }

  //단일 아이템 카드 삽입
  addBox(box) {
    this._array.push(
      <PWDayBox key={box.id} id={box.id} day={box.day} pgen={box.gen} />
    );
  }

  //아이템 카드 배열 삽입
  addBoxArray(array) {
    array.forEach((box) => {
      this._array.push(
        <PWDayBox key={box.id} id={box.id} day={box.day} pgen={box.gen} />
      );
    });
  }

  removeTop() {
    this._array.pop();
    this._genArray.pop();
  }

  remove(id) {
    this._array = this._array.filter((e) => {
      if (!(e.id == id)) {
        return true;
      }
    });
  }

  //아이템 리스트 초기화
  clear() {
    this._array = null;
    this._array = new Array();
  }

  getFormData() {
    var formData = new FormData();

    var data = { data: [] };
    for (var i = 0; i < this._genArray.length; i++) {
      const temp = this._genArray[i];
      const adding = temp.getData();
      data = { data: [...data.data, adding.data] };
    }

    for (var i = 0; i < data.data.length; i++) {
      for (var j = 0; j < data.data[i].length; j++) {
        var key = i + "_" + j + "_";
        formData.append(key + "name", data.data[i][j].name);
        formData.append(key + "loc", data.data[i][j].loc);
        formData.append(key + "cost", data.data[i][j].cost);
        formData.append(key + "img", data.data[i][j].img[0]);
        formData.append(key + "content", data.data[i][j].content);
        formData.append(key + "trans", data.data[i][j].trans);
      }
      formData.append(i + "_plength", data.data[i].length);
    }
    return formData;
  }

  //렌더링
  render() {
    return <NoDotUl className="pw_day_box_list">{this._array}</NoDotUl>;
  }
}

export default PWDayBoxGenerator;
