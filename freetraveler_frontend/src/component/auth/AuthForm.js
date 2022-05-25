import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import palette from "../../lib/styles/palette";
import Button from "../common/Button";

/**
 * 회원가입 또는 로그인폼을 보여줍니다.
 */

const AuthFormBlock = styled.div`
  margin: 0;
  color: ${palette.gray[8]};
  margin-buttom: 1rem;
`;

/*스타일링된 인풋*/
const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid ${palette.gray[7]};
  }

  & + & {
    margin-top: 1rem;
  }
`;

/*로그인 스타일링 인풋*/
const LoginIdInput = styled.input`
  border-radius: 2px;
  width: 100%;
  height: 40px;
  border: 1px solid #e5e5e5;
  padding: 9px 12px;
  outline: none;
  box-sizing: border-box;
`;

/*비밀번호 스타일링 인풋*/
const LoginPwInput = styled.input`
  margin-top: 15px;
  border-radius: 2px;
  width: 100%;
  height: 40px;
  border: 1px solid #e5e5e5;
  padding: 9px 12px;
  outline: none;
  box-sizing: border-box;
`;

/*비밀번호 스타일링 인풋*/
const LoginBtn = styled.input`
  width: 100%;
  height: 40px;
  font-size: 14px;
  padding: 13px 30px;
  cursor: pointer;
  background-color: black;
  color: white;
  line-height: 1px;
  margin-top: 20px;
  margin-bottom: 12px;
  border-radius: 3px;
  border-style: none;
`;

const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    color: ${palette.gray[6]};
    text-decoration: underline;
    &:hover {
      color: ${palette.gray[9]};
    }
  }
`;

const ButtonWithMarginTop = styled(Button)`
  margin-top: 1rem;
`;

const ErrorMesageBox = styled.div`
  color: red;
  margin-bottom: 20px;
  font-size: 10pt;
`;

const textMap = {
  login: "로그인",
  register: "회원가입",
};

const AuthForm = ({ type, form, onChange, onSubmit, error }) => {
  const text = textMap[type];

  let [idIntegrity, setIdIntegrity] = useState("");
  let [passwordIntegrity, setPasswordIntegrity] = useState("");
  let [passConfirmIntegrity, setPassConfirmIntegrity] = useState("");
  let [nameIntegrity, setNameIntegrity] = useState("");

  let [passing, setPassing] = useState([false, false, false, false]);

  let { password, passwordConfirm } = useSelector(({ auth: { register } }) => ({
    password: register.password,
    passwordConfirm: register.passwordConfirm,
  }));

  const onSubmitForm = (e) => {
    e.preventDefault();
    let tick = true;

    if (type == "login") {
      passing[1] = true;
      passing[2] = true;
      passing[3] = true;
    }
    for (let i = 0; i < passing.length; i++) {
      if (passing[i] == false) {
        console.log(passing[i]);
        tick = false;
      }
    }
    console.log(passing);
    if (tick) {
      onSubmit(e);
    } else {
      alert("입력을 다시 확인해주세요.");
    }
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "username": {
        let pass = false;
        const regex = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        pass = regex.test(value);
        if (!pass) {
          setIdIntegrity("이메일 형식으로 입력해주세요.");
        } else {
          setIdIntegrity("");
        }
        passing[0] = pass;
        break;
      }
      case "password": {
        let pass = false;

        if (type == "register") {
          const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*\W).{8,20}$/;
          pass = regex.test(value);
          if (!pass) {
            setPasswordIntegrity(
              "알파벳, 숫자, 특수문자의 조합으로 8자에서 20자 사이로 입력해주세요."
            );
          } else {
            setPasswordIntegrity("");
            passing[1] = pass;
          }
          //비밀번호 일치 확인
          pass = passwordConfirm == value;
          if (!pass) {
            setPassConfirmIntegrity("비밀번호와 일치 하지 않습니다.");
          } else {
            setPassConfirmIntegrity("");
          }
        } else if (type == "login") {
          pass = value != "";
          if (!pass) {
            setPasswordIntegrity("비밀번호를 입력해주세요.");
          } else {
            setPasswordIntegrity("");
          }
        }
        break;
      }
      case "passwordConfirm": {
        let pass = false;
        pass = password == value;
        if (!pass) {
          setPassConfirmIntegrity("비밀번호와 일치 하지 않습니다.");
        } else {
          setPassConfirmIntegrity("");
        }
        passing[2] = type == "register" ? pass : type == "login" ? true : false;
        break;
      }
      case "name": {
        let pass = false;
        const regex = /^([가-힣]{2,4}|[a-zA-Z]{2,16})$/;
        pass = regex.test(value);
        if (!pass) {
          setNameIntegrity(
            "2자에서 4자사이 한글이나, 2자에서 16자사이 영어로 입력해주세요."
          );
        } else {
          setNameIntegrity("");
        }
        passing[3] = type == "register" ? pass : type == "login" ? true : false;
        break;
      }
    }
  };

  return (
    <AuthFormBlock>
      <h3>{text}</h3>
      <form onSubmit={onSubmitForm}>
        <ErrorMesageBox>{error}</ErrorMesageBox>
        <LoginIdInput
          autoComplete="username"
          name="username"
          placeholder="아이디"
          onChange={(e) => {
            onChange(e);
            onChangeInput(e);
          }}
          value={form.username}
        />
        {idIntegrity != null && <ErrorMesageBox>{idIntegrity}</ErrorMesageBox>}
        <LoginPwInput
          autoComplete="new-password"
          name="password"
          placeholder="비밀번호"
          type="password"
          onChange={(e) => {
            onChange(e);
            onChangeInput(e);
          }}
          value={form.password}
        />
        {passwordIntegrity != null && (
          <ErrorMesageBox>{passwordIntegrity}</ErrorMesageBox>
        )}
        {type === "register" && (
          <>
            <LoginPwInput
              autoComplete="new-password"
              name="passwordConfirm"
              placeholder="비밀번호 확인"
              type="password"
              onChange={(e) => {
                onChange(e);
                onChangeInput(e);
              }}
              value={form.passwordConfirm}
            />
            {passwordIntegrity != null && (
              <ErrorMesageBox>{passConfirmIntegrity}</ErrorMesageBox>
            )}
          </>
        )}
        {type === "register" && (
          <>
            <LoginPwInput
              autoComplete="name"
              name="name"
              placeholder="이름"
              onChange={(e) => {
                onChange(e);
                onChangeInput(e);
              }}
              value={form.name}
            />
            {nameIntegrity != null && (
              <ErrorMesageBox>{nameIntegrity}</ErrorMesageBox>
            )}
          </>
        )}
        <ButtonWithMarginTop cyan fullWidth>
          {text}
        </ButtonWithMarginTop>
      </form>
      <Footer>
        {type === "login" ? (
          <Link to="/register">회원가입</Link>
        ) : (
          <Link to="/login">로그인</Link>
        )}
      </Footer>
    </AuthFormBlock>
  );
};

export default AuthForm;
