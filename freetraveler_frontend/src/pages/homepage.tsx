import React from "react";
import ContentTemplate from "../component/common/ContentTemplate";
import ItemCard from "../component/list/itemcard";

function Home() {
  return (
    <>
    <ContentTemplate>
      <div className="Home">홈페이지</div>
      <ItemCard/>
    </ContentTemplate>
    </>
  );
}

export default Home;
