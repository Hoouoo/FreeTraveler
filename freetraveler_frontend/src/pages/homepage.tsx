import React from "react";
import Footer from "../component/common/Footer";
import PostReadContainer from "../containers/post/PostReadContainer";
import PostWriteContainer from "../containers/post/PostWriteContainer";

function Home() {
  return (
    <>
      <PostWriteContainer id="id" mode="mode"/>
      {/* <Footer /> */}
    </>
  );
}

export default Home;
