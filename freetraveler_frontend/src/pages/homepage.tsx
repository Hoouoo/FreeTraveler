import React from "react";
import ContentTemplate from "../component/common/ContentTemplate";
import Footer from "../component/common/Footer";
import Header from "../component/common/Header";
import ItemCard from "../component/list/itemcard";

function itemCard() {
  var list = new Array();
  for (var i=0; i<10; i++){
    list[i] = <ItemCard />;
  }
  return list;
}

function Home() {
  return (
    <>
        {itemCard()}
        <Footer />
    </>
  );
}

export default Home;
