import React from "react";
import FollowCard from "../../../component/list/FollowCard";
import styled from "styled-components";

class FollowCardGenerator {
  constructor() {
    this._array = new Array();
    this._index = 0;
  }

  //단일 아이템 카드 삽입
  addFollowCard(followCard) {
    this._array[this._index] = (
      <div key={"followCard_" + this._index} id={"followCard_" + this._index}>
        <FollowCard
          id={followCard.id}
          name={followCard.name}
          isCross={followCard.isCross}
          isFollow={followCard.isFollow}
          gen={followCard.gen}
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

export default FollowCardGenerator;
