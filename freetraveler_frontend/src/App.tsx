import React from "react";
import { Route, Switch } from "react-router-dom";
import ContentTemplate from "./component/common/ContentTemplate";
import Footer from "./component/common/Footer";
import FrontRouter from "./component/common/FrontRouter";
import Header from "./component/common/Header";
import TabBar from "./component/common/TabBar";
import ItemCard from "./component/list/ItemCard";
import Account from "./pages/AccountPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Pick from "./pages/MyPickPage";
import PostListPage from "./pages/PostListPage.js";
import Post from "./pages/PostListPage.js";
import PostModifyPage from "./pages/PostModifyPage";
import PostReadPage from "./pages/PostReadPage";
import PostWritePage from "./pages/PostWritePage";
import RegisterPage from "./pages/RegisterPage";
import Search from "./pages/SearchPage";
import Follow from "./pages/FollowPage";

function App() {
  return (
    <>
      <FrontRouter/>
      <Header />
      <Switch>
        <ContentTemplate>
          <Route exact path="/" component={HomePage} />
          <Route path="/home" component={HomePage} />
          <Route path="/pick" component={Pick} />
          <Route path="/posting/list" component={PostListPage} />
          <Route path="/account" component={Account} />
          <Route path="/search" component={Search} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage}/>
          <Route path="/posting/write" component={PostWritePage}/>
          <Route path="/posting/modify" component={PostModifyPage}/>
          <Route path="/posting/read" component={PostReadPage} />
          <Route path="/follow" component={Follow} />
        </ContentTemplate>
      </Switch>
      <TabBar />
    </>
  );
}

export default App;
