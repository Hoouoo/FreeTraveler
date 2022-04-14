import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

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
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 0;
    border-top: 1px solid rgb(230, 230, 230);
  }
  .bn-tab {
    width: 25%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  .box {
    width: 100%;
    height: 50%;
    text-align: center;
    display: inline-block;
  }
`;

const TabBar = (props: any) => {
  const history = useHistory();
  const [activeTabs, setActiveTabs] = useState(props.name);
  useEffect(() => {
    switch (activeTabs) {
      // case "home":
      //   history.push("/");
      //   break;
      // case "pick":
      //   history.push("/mypick");
      //   break;
      // case "post":
      //   history.push("/post");
      //   break;
      // case "account":
      //   history.push("/account");
      //   break;
      // default:
      //   history.push("/");
      //   break;
    }
  }, [activeTabs, history]);

  return (
    <TabBarStyled>
      <div className="bottom-nav">
        <div className="bn-tab">
          <div className="box">
            {activeTabs === "home" ? (
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
            {activeTabs === "pick" ? (
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
            {activeTabs === "post" ? (
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
            {activeTabs === "account" ? (
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
