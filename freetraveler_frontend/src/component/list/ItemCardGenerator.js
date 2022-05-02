import React from "react";
import ItemCard from "./ItemCard";

class ItemCardGenerator {
  constructor() {
    this._array = new Array();
    this._index = 0;
  }

  //단일 아이템 카드 삽입
  addItemCard(itemcard) {
    this._array[this._index] = (
      <ItemCard
        img={itemcard.img}
        name={itemcard.name}
        how={itemcard.how}
        days={itemcard.days}
        cost={itemcard.cost}
        desc={itemcard.desc}
      />
    );
    this._index++;
  }

  //아이템 카드 배열 삽입
  addItemCardArray(array) {
    array.forEach((itemcard) => {
      this._array[this._index] = (
        <ItemCard
          img={itemcard.img}
          name={itemcard.name}
          how={itemcard.how}
          days={itemcard.days}
          cost={itemcard.cost}
          desc={itemcard.desc}
        />
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
    return this._array;
  }
}

export default ItemCardGenerator;
