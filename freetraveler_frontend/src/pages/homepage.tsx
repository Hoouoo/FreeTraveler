import React from "react";
import ContentTemplate from "../component/common/ContentTemplate";
import Footer from "../component/common/Footer";
import Header from "../component/common/Header";
import ItemCard from "../component/list/ItemCard";
import ItemCardGenerator from "../component/list/ItemCardGenerator";

function Home() {
  const gen = new ItemCardGenerator();
  gen.addItemCard({img:"화와이 이미지", name:"하와이", how:"도보", days:"5일", cost:"100만원", desc:"하와이는 와이키키"})
  
  return (
    <>
        {gen.render()}
        <Footer />
    </>
  );
}

export default Home;
