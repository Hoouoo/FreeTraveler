import React from "react";
import PostListTemplate from "../../component/post/PostListTemplate";
import PostReadForm from "../../component/post/read/PostReadForm";
import ItemCardGenerator from "../../component/list/ItemCardGenerator";
import { useSelector } from "react-redux";

export default function PostListCotainer({ id }) {
  const gen = new ItemCardGenerator();
  const { data } = useSelector(({ post }) => ({
    data: post.postRead,
  }));

  for (var i = 0; i <= 14; i++) {
    gen.addItemCard({
      id: i,
      img: "http://www.epj.co.kr/news/photo/201908/22686_32938_355.jpg",
      name: "제목이랍니다." + i,
      how: "비행기, 자동차, 도보",
      days: "5일",
      cost: "100만원",
      desc: "하와이는 와이키키를 추천합니다.",
    });
  }
  return <PostListTemplate id={id}>{gen.render()}</PostListTemplate>;
}
