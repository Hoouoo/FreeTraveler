import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthForm from "../../component/auth/AuthForm";
import { changeField, initializeForm, register } from "../../module/auth";
import { check } from "../../module/user";
import user from "../../module/user";
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const RegisterForm = ({ history }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));

  //인풋 변경 이벤트 핸들러
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: "register",
        key: name,
        value,
      })
    );
  };

  //폼 이벤트 등록 핸들러
  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password, passwordConfirm, name } = form;
    if (password !== passwordConfirm) {
      //Todo: 오류처리
      return;
    }
    dispatch(register({ username, password, name }));
  };

  //컴포넌트가 처음 렌더링될 때 form을 초기화함
  useEffect(() => {
    dispatch(initializeForm("register"));
  }, [dispatch]);

  // 회원가입 성공/실패 처리
  useEffect(() => {
    if (authError) {
      setError("유효성 안맞음.");
      return;
    }
    if (auth) {
      console.log("회원가입 성공");
      console.log(auth);
      alert("회원가입 성공!");
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (user) {
      history.push("/");
    }
  }, [user, history]);

  return (
    <AuthForm
      type="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default withRouter(RegisterForm);
