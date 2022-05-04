import React from "react";
import { Route, Switch } from "react-router-dom";
import ContentTemplate from "./component/common/ContentTemplate";
import Footer from "./component/common/Footer";
import FrontRouter from "./component/common/FrontRouter";
import Header from "./component/common/Header";
import TabBar from "./component/common/TabBar";
import ItemCard from "./component/list/ItemCard";
import Account from "./pages/AccountPage";
import Home from "./pages/homepage";
import LoginPage from "./pages/LoginPage";
import Pick from "./pages/MyPickPage";
import PostListPage from "./pages/PostListPage.js";
import Post from "./pages/PostListPage.js";
import RegisterPage from "./pages/RegisterPage";
import Search from "./pages/SearchPage";

function App() {
  return (
    <>
      <FrontRouter/>
      <Header />
      <Switch>
        <ContentTemplate>
          <Route exact path="/" component={Home} />
          <Route path="/home" component={Home} />
          <Route path="/Pick" component={Pick} />
          <Route path="/post" component={PostListPage} />
          <Route path="/account" component={Account} />
          <Route path="/search" component={Search} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage}/>
        </ContentTemplate>
      </Switch>
      <TabBar />
    </>
  );
}

export default App;
