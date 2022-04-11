import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import ftlogo from "../../resource/img/ftlogo.png";
import { Link } from "react-router-dom";
import { MdOutlineSearch } from "react-icons/md";

const HeaderStyled = styled.div`
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #000000;
  background-color: #ffffff;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);

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

  @media screen and (max-width: 768px) {
    flex-wrap: wrap;

    .header__right {
      display: ${(props: any) => (props.searchToggled ? "flex" : "none")};
      flex-direction: column;
      width: 100%;
      background-color: black;
    }

    .header__menulist {
      display: ${(props: any) => (props.isToggled ? "flex" : "none")};
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

function Header() {
  const [isToggled, setIsToggled] = useState(false);
  const [searchToggled, setSearchToggled] = useState(false);

  return (
    <HeaderStyled>
      {/* 햄버거 버튼(bar) */}
      <div
        className="toggle"
        onClick={() => {
          setIsToggled(!isToggled);
        }}
      >
        <FontAwesomeIcon icon={!isToggled ? faBars : faTimes} />
      </div>
      {/* 메뉴 리스트 -- 아직 추가 안 함.*/}
      <ul className="header__menulist">
        <li></li>
        <li></li>
        <li></li>
      </ul>
      {/* logo */}
      <div className="logo">
        <img className="logo__center" src={ftlogo} />
      </div>

      {/* Search 버튼 */}
      {!searchToggled ? (
        <div
          className="user"
          onClick={() => {
            setSearchToggled(!searchToggled);
          }}
        >
          <Link to="/Search">
            <MdOutlineSearch size="25" color="#000" />
          </Link>
        </div>
      ) : (
        <div
          className="user"
          onClick={() => {
            setSearchToggled(!searchToggled);
          }}
        >
          <Link to="/Home">
            <FontAwesomeIcon icon={faTimes} />
          </Link>
        </div>
      )}

      {/* 오른쪽 메뉴 리스트 */}
      <ul className="header__right">
        <li>Login</li>
        <li>Search</li>
      </ul>
    </HeaderStyled>
  );
}

export default Header;
