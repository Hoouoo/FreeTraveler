import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import ftlogo from "../../resource/img/ftlogo.png";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../module/user";
import { IoChevronBack } from "react-icons/io5";

const HeaderStyled = styled.div`
  z-index: 1;
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #000000;
  background-color: #ffffff;
  box-shadow: 0px 0px 5px rgba(255, 255, 255, 1);
  position: fixed;
  width: 100%;
  border-bottom: 1px solid rgb(230, 230, 230);

  .logo__center {
    width: auto;
    height: 35px;
    margin-left: 150px;
  }

  .logo {
    font-size: 2rem;
    text-align: center;
  }

  .header__left {
    display: flex;
    margin-left: 15px;
  }

  .header__right {
    list-style: none;
    display: flex;
  }

  .header__right div {
    margin: 0 1rem;
  }

  li {
    padding: 0 1rem;
  }

  .toggle {
    display: none;
    font-size: 1.5rem;
    padding: 1rem 1rem;
  }

  .user {
    display: none;
    font-size: 1.5rem;
    padding: 1rem 1rem;
  }

  a {
    color: black;
    text-decoration: none;
  }
  a:visited {
    text-decoration: none;
  }
  a:hover {
    text-decoration: none;
  }
  a:focus {
    text-decoration: none;
  }
  a:hover,
  a:active {
    text-decoration: none;
  }

  span {
    margin-left: 16px;
  }

  @media screen and (max-width: 768px) {
    flex-wrap: wrap;

    .logo__center {
      width: auto;
      height: 30px;
      margin-left: 45px;
    }

    .header__right {
      display: ${(props) => (props.isToggled ? "flex" : "none")};
      flex-direction: column;
      width: 100%;
      background-color: white;
    }

    .header__menulist li,
    .header__right li {
      margin: 1rem 0;
      padding: 0;
    }

    .toggle {
      display: block;
    }

    .user {
      display: block;
    }
  }
`;

function Header({}) {
  const [isToggled, setIsToggled] = useState(false);
  // const [searchToggled, setSearchToggled] = useState(false);

  const [sidebar, setSidebar] = useState(false);
  // const showSidebar = () => setSidebar(!sidebar);

  const dispatch = useDispatch();
  const history = useHistory();

  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));

  function Logout() {
    history.push("/");
    dispatch(logout());
  }

  return (
    <HeaderStyled isToggled={isToggled}>
      <div className="header__left">
        <IoChevronBack
          size="20"
          color="#000"
          onClick={() => {
            history.goBack();
          }}
        />
      </div>

      {/* logo */}
      <div className="logo">
        <img className="logo__center" src={ftlogo} />
      </div>

      {/* 네비게이션 토글 코드*/}
      <div
        className="toggle"
        onClick={() => {
          setIsToggled(!isToggled);
        }}
      >
        <FontAwesomeIcon icon={!isToggled ? faBars : faTimes} />
      </div>

      {/* 오른쪽 메뉴 리스트 */}
      <ul className="header__right">
        {user == null && (
          <li>
            <a href="/login">Login</a>
          </li>
        )}
        {user !== null && (
          <li>
            <a onClick={Logout}>Logout</a>
          </li>
        )}
        <li>Search</li>
      </ul>
    </HeaderStyled>
  );
}

export default Header;
