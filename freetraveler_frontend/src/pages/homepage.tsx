import React from "react";
import ContentTemplate from "../component/common/ContentTemplate";
import Footer from "../component/common/Footer";
import Header from "../component/common/Header";
import ItemCard from "../component/list/ItemCard";
import ItemCardGenerator from "../component/list/ItemCardGenerator";

function Home() {
  const gen = new ItemCardGenerator();
  gen.addItemCard({img:"http://www.epj.co.kr/news/photo/201908/22686_32938_355.jpg",
   name:"하와이", how:"비행기, 자동차, 도보", days:"5일", cost:"100만원", desc:"하와이는 와이키키를 추천합니다."});
  return (
    <>
        {gen.render()}
        <Footer />
    </>
  );
}

export default Home;
