import client from "./client";

//로그인
export const login = ({ username, password }) =>
  client.post(
    "/login ",
    { userId: username, userPassword: password },
    { withCredentials: true }
  );

//회원가입
export const register = ({ username, password, name }) =>
  client.post(
    "/account",
    { userId: username, userPassword: password, userName: name },
    { withCredentials: true }
  );

//로그인 상태 확인
export const check = () =>
  client.get("/account/check", { withCredentials: true });

//로그 아웃
export const logout = () => client.get("/logout", { withCredentials: true });
