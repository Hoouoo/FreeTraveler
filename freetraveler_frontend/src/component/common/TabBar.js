import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import {
  RiHomeSmile2Line,
  RiHomeSmile2Fill,
  RiUser5Fill,
  RiFileList2Line,
} from "react-icons/ri";
import {
  RiUser5Line,
  RiFileList2Fill,
  RiRoadMapFill,
  RiRoadMapLine,
} from "react-icons/ri";

const TabBarStyled = styled.div`
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
    border-top: 1px solid rgb(230, 230, 230);
    background-color: lightgreen;
    padding-top: 5px;
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
    width: 22%;
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
  }
`;

const TabBar = (props) => {
  const history = useHistory();
  const location = useLocation();

  const [activeTabs, setActiveTabs] = useState(props.name);

  const tabbarPath = ["/", "/home", "/pick", "/post", "/account"];

  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));

  useEffect(() => {
    if (user != null) {
      switch (activeTabs) {
        case "home":
          history.push("/");
          break;
        case "pick":
          history.push("/pick");
          break;
        case "post":
          history.push("/post");
          break;
        case "account":
          history.push("/account");
          break;
        default:
          break;
      }
    }
  }, [activeTabs, user]);

  if (!tabbarPath.includes(history.location.pathname)) {
    return <></>;
  }
  return (
    <TabBarStyled>
      <div className="bottom-nav">
        <div className="bn-tab">
          <div className="box">
            {location.pathname == "/home" || location.pathname == "/" ? (
              <RiHomeSmile2Fill
                size="25"
                color="#000"
                onClick={() => setActiveTabs("home")}
              />
            ) : (
              <RiHomeSmile2Line
                size="25"
                color="#000"
                onClick={() => setActiveTabs("home")}
              />
            )}
          </div>
          <div className="box">HOME</div>
        </div>
        <div className="bn-tab">
          <div className="box">
            {location.pathname == "/pick" ? (
              <RiRoadMapFill
                size="25"
                color="#000"
                onClick={() => setActiveTabs("pick")}
              />
            ) : (
              <RiRoadMapLine
                size="25"
                color="#000"
                onClick={() => setActiveTabs("pick")}
              />
            )}
          </div>
          <div className="box">MY PICK</div>
        </div>
        <div className="bn-tab">
          <div className="box">
            {location.pathname == "/post" ? (
              <RiFileList2Fill
                size="25"
                color="#000"
                onClick={() => setActiveTabs("post")}
              />
            ) : (
              <RiFileList2Line
                size="25"
                color="#000"
                onClick={() => setActiveTabs("post")}
              />
            )}
          </div>
          <div className="box">POST</div>
        </div>
        <div className="bn-tab">
          <div className="box">
            {location.pathname == "/account" ? (
              <RiUser5Fill
                size="25"
                color="#000"
                onClick={() => setActiveTabs("account")}
              />
            ) : (
              <RiUser5Line
                size="25"
                color="#000"
                onClick={() => setActiveTabs("account")}
              />
            )}
          </div>
          <div className="box">ACCOUNT</div>
        </div>
      </div>
    </TabBarStyled>
  );
};

export default TabBar;
