import React from "react";
import { Route, Switch } from "react-router-dom";
import Footer from "./component/common/Footer";
import Header from "./component/common/Header";
import TabBar from "./component/common/TabBar";
import Account from "./pages/AccountPage";
import Home from "./pages/homepage";
import MyPick from "./pages/MyPickPage";
import Post from "./pages/PostPage";
import Search from "./pages/SearchPage";

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/Home" component={Home} />
        <Route path="/MyPick" component={MyPick} />
        <Route path="/Post" component={Post} />
        <Route path="/Account" component={Account} />
        <Route path="/Search" component={Search} />
      </Switch>
      <Footer />
      <TabBar />
    </div>
  );
}

export default App;
