import React from "react";
import Footer from "../component/common/Footer";
import PostReadContainer from "../containers/post/PostReadContainer";
import PostWriteContainer from "../containers/post/PostWriteContainer";
import { setCookie } from "../lib/cookie";

function HomePage() {
  setCookie("JSESSIONID", " ");
  return (
    <>
      여기는 홈페이지다
      <Footer />
    </>
  );
}

export default HomePage;
