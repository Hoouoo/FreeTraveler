import React from "react";
import ItemCard from "./ItemCard";
import styled from "styled-components";

const ItemCardStyled = styled.div`
  list-style: none;
  ul {
    list-style: none;
  }
`;

class ItemCardGenerator {
  constructor() {
    this._array = new Array();
    this._index = 0;
  }

  //단일 아이템 카드 삽입
  addItemCard(itemcard) {
    this._array[this._index] = (
      <li key={"itemcard_" + itemcard.id} id={"itemcard_" + itemcard.id}>
        <ItemCard
          id={itemcard.id}
          author={itemcard.author}
          repImg={itemcard.repImg}
          postName={itemcard.postName}
          totalTrans={itemcard.totalTrans}
          totalDays={itemcard.totalDays}
          cost={itemcard.cost}
          comment={itemcard.comment}
          good={itemcard.good}
          isGood={itemcard.isGood}
          isPick={itemcard.isPick}
        />
      </li>
    );
    this._index++;
  }

  //아이템 카드 배열 삽입
  addItemCardArray(array) {
    array.forEach((itemcard) => {
      this._array[this._index] = (
        <li id={"itemcard_" + itemcard.id}>
          <ItemCard
            id={itemcard.id}
            img={itemcard.img}
            name={itemcard.name}
            how={itemcard.how}
            days={itemcard.days}
            cost={itemcard.cost}
            desc={itemcard.desc}
          />
        </li>
      );
      this._index++;
    });
  }

  //아이템 리스트 초기화
  clear() {
    this._array = null;
    this._array = new Array();
  }

  //렌더링
  render() {
    return (
      <ItemCardStyled>
        <ul id="itemcard_list">{this._array}</ul>
      </ItemCardStyled>
    );
  }
}

export default ItemCardGenerator;
