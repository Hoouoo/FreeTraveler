import React from "react";
import { Route, Switch } from "react-router-dom";
import Footer from "./component/common/Footer";
import Header from "./component/common/Header";
import TabBar from "./component/common/TabBar";
import ItemCard from "./component/list/itemcard";
import Account from "./pages/AccountPage";
import Home from "./pages/homepage";
import LoginPage from "./pages/LoginPage";
import MyPick from "./pages/MyPickPage";
import Post from "./pages/PostPage";
import RegisterPage from "./pages/RegisterPage";
import Search from "./pages/SearchPage";

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/myPick" component={MyPick} />
        <Route path="/post" component={Post} />
        <Route path="/account" component={Account} />
        <Route path="/search" component={Search} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
      </Switch>
      <Footer />
      <TabBar />
    </div>
  );
}

export default App;
