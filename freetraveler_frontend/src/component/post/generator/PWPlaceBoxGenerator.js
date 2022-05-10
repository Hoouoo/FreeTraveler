import React, { Component } from "react";
import styled from "styled-components";
import PWDayBox from "../PWDayBox";
import PWPlaceBox from "../PWPlaceBox";

class PWPlaceBoxGenerator {
  constructor(places, setPlaces) {
    this._array = new Array();
    this._index = -1;

    this.places = places;
    this.setPlaces = setPlaces;
  }

  //단일 아이템 카드 삽입
  addBox(box) {
    this._index++;
    this._array.push(
      <PWPlaceBox
        key={this._index}
        did={box.did}
        pid={this._index}
        gen={this}
      />
    );
    this.setPlaces(this.render());
  }

  //아이템 카드 배열 삽입
  addBoxArray(array) {
    array.forEach((box) => {
      this._index++;
      this._array.push(
        <PWPlaceBox
          key={this._index}
          did={box.did}
          pid={this._index}
          gen={this}
        />
      );
    });

    this.setPlaces(this.render());
  }

  removeTop() {
    this._array.pop();
    this._index--;

    this.setPlaces(this.render());
  }

  remove(key) {
    this._array = this._array.filter((e) => {
      if (!(e.key == key)) {
        return true;
      } else {
        return false;
      }
    });

    var tempArray = new Array();

    for (var i = 0; i < this._array.length; i++) {}
    // for (var i = key; i < this._array.length; i++) {
    //   this._array[i] = this._array[i + 1];
    // }
    // this._array.pop();

    this.setPlaces(this.render());
  }

  //아이템 리스트 초기화
  clear() {
    this._array = null;
    this._array = new Array();
  }

  //폼데이터 추출
  getFormData() {
    var formData = new FormData();
    for (var i = 0; i < this._array.length; i++) {
      const e = this._array[i];
    }
  }

  //렌더링
  render() {
    return <div className="pw_place_box_list">{this._array}</div>;
  }
}

export default PWPlaceBoxGenerator;
