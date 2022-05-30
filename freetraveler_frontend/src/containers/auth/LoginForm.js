import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeField, initializeForm, login } from "../../module/auth";
import AuthForm from "../../component/auth/AuthForm";
import { useHistory, withRouter } from "react-router-dom";
import { check } from "../../module/user";

const LoginForm = ({ history }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.login,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));

  //인풋 변경 이벤트 핸들러
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: "login",
        key: name,
        value,
      })
    );
  };

  // 폼 등록 이벤트 핸들러
  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = form;
    dispatch(login({ username, password }));
  };

  //컴포넌트가 처음 렌더링될 때 form을 초기화함
  useEffect(() => {
    dispatch(initializeForm("login"));
  }, [dispatch]);

  //로그인 오류 처리
  useEffect(() => {
    if (authError) {
      setError("로그인 실패");
      return;
    }
    if (auth) {
      console.log("로그인 성공");
      dispatch(check());
    }
    if (user) {
      alert("로그인 성공");
    }
  }, [auth, user, authError, dispatch, history]);

  //로그인되면 자동으로 홈 화면 이동
  useEffect(() => {
    if (user) {
      history.push("/");
    }
  }, [history, user]);

  return (
    <AuthForm
      type="login"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default withRouter(LoginForm);
