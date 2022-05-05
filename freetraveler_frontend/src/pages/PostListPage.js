import React from "react";
import PostListTemplate from "../component/post/PostListTemplate";
import ItemCardGenerator from "../component/list/ItemCardGenerator";

const PostListPage = () => {
  const gen = new ItemCardGenerator();
  for (var i = 0; i <= 14; i++) {
    gen.addItemCard({
      img: "http://www.epj.co.kr/news/photo/201908/22686_32938_355.jpg",
      name: "제목이랍니다." + i,
      how: "비행기, 자동차, 도보",
      days: "5일",
      cost: "100만원",
      desc: "하와이는 와이키키를 추천합니다.",
    });
  }

  return <PostListTemplate>{gen.render()}</PostListTemplate>;
};

export default PostListPage;
