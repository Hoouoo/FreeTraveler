import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import palette from "../../lib/styles/palette";
import { Link } from "react-router-dom";

import {
  RiHomeSmile2Line,
  RiHomeSmile2Fill,
  RiUser5Fill,
  RiFileList2Line,
  RiUserHeartFill,
  RiUserHeartLine,
} from "react-icons/ri";
import {
  RiUser5Line,
  RiFileList2Fill,
  RiRoadMapFill,
  RiRoadMapLine,
} from "react-icons/ri";

const TabBarStyled = styled.div`
  box-shadow: 0 1 8px rgba(0, 0, 0, 0.025);
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  .bottom-nav {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 0;
    border-top: 1px solid ${palette.gray[4]};
    padding-top: 5px;
    background-color: white;
  }
  .bn-tab-clear {
    width: 25%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  .bn-tab {
    cursor: pointer;
    width: 15%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  }
  .box {
    width: 100%;
    height: 50%;
    text-align: center;
    display: inline-block;
  }
  @media screen and (max-width: 768px) {
    .bn-tab-clear {
      width: 0%;
      height: 100%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
    }
    .bn-tab {
      width: 22%;
      font-size: 12px;
    }
  }
`;

const TabBar = (props) => {
  const history = useHistory();
  const location = useLocation();

  const [activeTabs, setActiveTabs] = useState(props.name);

  const tabbarPath = [
    "/",
    "/home",
    "/pick",
    "/posting/list",
    "/account",
    "/follow",
  ];

  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setActiveTabs("home");
        break;
      case "/home":
        setActiveTabs("home");
      case "/pick":
        setActiveTabs("pick");
        break;
      case "/posting/list":
        setActiveTabs("post");
        break;
      case "/account":
        setActiveTabs("account");
        break;
      case "/follow":
        setActiveTabs("follow");
        break;
    }
  }, [activeTabs, location]);

  if (!tabbarPath.includes(history.location.pathname)) {
    return <></>;
  }

  const homeButtonClick = () => {
    history.push("/");
  };

  const postButtonClick = () => {
    history.push({
      pathname: "/posting/list",
      search: `page=${0}&pageSize=6&sort=recent&orderBy=desc&search=&method=&isMyPick=all&isMine=false&friend=`,
    });
  };

  const pickButtonClick = () => {
    history.push({
      pathname: "/pick",
      search: `page=${0}&pageSize=6&sort=recent&orderBy=desc&search=&method=&isMyPick=pick&isMine=false&friend=`,
    });
  };

  const accountButtonClick = () => {
    history.push("/account");
  };

  const followButtonClick = () => {
    history.push("/follow");
  };

  return (
    <TabBarStyled>
      <div className="bottom-nav">
        <div className="bn-tab" onClick={() => homeButtonClick()}>
          <div className="box">
            {activeTabs == "home" ? (
              <RiHomeSmile2Fill size="25" color="#000" />
            ) : (
              <RiHomeSmile2Line size="25" color="#000" />
            )}
          </div>
          <div className="box">HOME</div>
        </div>
        <div className="bn-tab" onClick={() => pickButtonClick()}>
          <div className="box">
            {activeTabs == "pick" ? (
              <RiRoadMapFill size="25" color="#000" />
            ) : (
              <RiRoadMapLine size="25" color="#000" />
            )}
          </div>
          <div className="box">MY PICK</div>
        </div>
        <div className="bn-tab" onClick={() => postButtonClick()}>
          <div className="box">
            {activeTabs == "post" ? (
              <RiFileList2Fill size="25" color="#000" />
            ) : (
              <RiFileList2Line size="25" color="#000" />
            )}
          </div>
          <div className="box">POST</div>
        </div>
        <div className="bn-tab" onClick={() => followButtonClick()}>
          <div className="box">
            {activeTabs == "follow" ? (
              <RiUserHeartFill size="25" color="#000" />
            ) : (
              <RiUserHeartLine size="25" color="#000" />
            )}
          </div>
          <div className="box">FOLLOW</div>
        </div>
        <div className="bn-tab" onClick={() => accountButtonClick()}>
          <div className="box">
            {activeTabs == "account" ? (
              <RiUser5Fill size="25" color="#000" />
            ) : (
              <RiUser5Line size="25" color="#000" />
            )}
          </div>
          <div className="box">ACCOUNT</div>
        </div>
      </div>
    </TabBarStyled>
  );
};

export default TabBar;
