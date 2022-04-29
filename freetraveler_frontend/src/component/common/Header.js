import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import ftlogo from "../../resource/img/ftlogo.png";
import { Link, useHistory } from "react-router-dom";
import { MdOutlineSearch, MdOutlineAccountCircle } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../module/user";
import { IoChevronBack } from "react-icons/io5";
import { FaBars } from "react-icons/fa";
import { BsPersonBoundingBox } from "react-icons/bs";

const HeaderStyled = styled.div`
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #000000;
  background-color: #ffffff;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
  position: fixed;
  width: 100%;

  .logo__center {
    width: auto;
    height: 30px;
  }

  .logo {
    margin: 0 1rem;
    font-size: 2rem;
    text-align: center;
  }

  .header__menulist {
    list-style: none;
    display: flex;
  }

  .header__left {
    display: flex;
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

  .navbar {
    height: 10px;
    display: flex;
    justify-items: center;
    align-items: center;
  }

  .menu-bars {
    margin-left: 2rem;
    font-size: 2rem;
    background: none;
  }

  .nav-menu {
    background-color: #ffff;
    width: 200px;
    height: 100vh;
    display: flex;
    position: fixed;
    top: 0;
    left: -80%;
    transition: 850ms;
  }

  .nav-menu.active {
    left: 0;
    transition: 350ms;
  }

  .nav-text {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 8px 0px 8px 16px;
    list-style: none;
    height: 60px;
  }
  .nav-text a {
    text-decoration: none;
    color: #000000;
    font-size: 18px;
    width: 95%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 16px;
    border-radius: 4px;
  }

  .nav-text a:hover {
    background-color: #d3d3d3;
  }

  .nav-menu-items {
    width: 100%;
  }

  .navbar-toggle {
    background-color: #00000;
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  span {
    margin-left: 16px;
  }

  @media screen and (max-width: 768px) {
    flex-wrap: wrap;

    .header__right {
      display: ${(props) => (props.searchToggled ? "flex" : "none")};
      flex-direction: column;
      width: 100%;
      background-color: black;
    }

    .header__menulist {
      display: ${(props) => (props.isToggled ? "flex" : "none")};
      flex-direction: column;
      width: 100%;
      background-color: black;
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
  const [searchToggled, setSearchToggled] = useState(false);

  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

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
    <HeaderStyled>
      {/* 햄버거 버튼(bar) */}
      <div
        className="toggle"
        onClick={() => {
          setIsToggled(!isToggled);
        }}
      >
        {/* <FontAwesomeIcon icon={!isToggled ? faBars : faTimes} /> */}
        <div className="header__left">
          <IoChevronBack
            size="20"
            color="#000"
            onClick={() => {
              history.goBack();
            }}
          />
        </div>
      </div>

      {/* 메뉴 리스트 -- 아직 추가 안 함.*/}
      <ul className="header__menulist">
        <div className="header__left">
          <IoChevronBack
            size="20"
            color="#000"
            onClick={() => {
              history.goBack();
            }}
          />
        </div>
      </ul>
      {/* logo */}
      <div className="logo">
        <img className="logo__center" src={ftlogo} />
      </div>

      {/* 네비게이션 토글 코드*/}
      <div className="user">
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaBars size="20" onClick={showSidebar} />
          </Link>
        </div>
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle"></li>
          {user == null && (
            <li className="nav-text">
              <Link to={"/login"}>
                <BsPersonBoundingBox />
                <span>Login</span>
              </Link>
            </li>
          )}
          {user != null && (
            <li className="nav-text">
              <Link onClick={Logout}>
                <BsPersonBoundingBox />
                <span>Logout</span>
              </Link>
            </li>
          )}
          <li className="nav-text">
            <Link to={"/search"}>
              <MdOutlineSearch />
              <span>Search</span>
            </Link>
          </li>
        </ul>
      </nav>

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
