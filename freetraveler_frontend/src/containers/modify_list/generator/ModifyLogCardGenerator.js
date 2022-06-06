import React from "react";
import ModifyLogCard from "../ModifyLogCard";
import styled from "styled-components";

class ModifyLogCardGenerator {
  constructor() {
    this._array = new Array();
    this._index = 0;
  }

  //단일 아이템 카드 삽입
  addFollowCard(modifyLogCard) {
    this._array[this._index] = (
      <div
        key={"modifyLogCard_" + this._index}
        id={"modifyLogCard_" + this._index}
      >
        <ModifyLogCard
          id={modifyLogCard.id}
          time={modifyLogCard.time}
          gen={modifyLogCard.gen}
          index={this._index}
        />
      </div>
    );
    this._index++;
  }

  remove(key) {
    this._array[key] = <></>;
  }

  //아이템 리스트 초기화
  clear() {
    this._array = null;
    this._array = new Array();
  }

  //렌더링
  render() {
    return this._array;
  }
}

export default ModifyLogCardGenerator;
