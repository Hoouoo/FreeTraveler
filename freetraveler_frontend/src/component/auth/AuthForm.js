import React from "react";
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
  return (
    <AuthFormBlock>
      <h3>{text}</h3>
      <form onSubmit={onSubmit}>
        <ErrorMesageBox>{error}</ErrorMesageBox>
        <LoginIdInput
          autoComplete="username"
          name="username"
          placeholder="아이디"
          onChange={onChange}
          value={form.username}
        />
        <LoginPwInput
          autoComplete="new-password"
          name="password"
          placeholder="비밀번호"
          type="password"
          onChange={onChange}
          value={form.password}
        />
        {type === "register" && (
          <LoginPwInput
            autoComplete="new-password"
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            type="password"
            onChange={onChange}
            value={form.passwordConfirm}
          />
        )}
        {type === "register" && (
          <LoginPwInput
            autoComplete="name"
            name="name"
            placeholder="이름"
            onChange={onChange}
            value={form.name}
          />
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
