import client from "./client";

//로그인
export const login = ({ username, password }) =>
  client.post("/login ", { username, password }, { withCredentials: true });

//회원가입
export const register = ({ username, password }) =>
  client.post("/account", { username, password }, { withCredentials: true });

//로그인 상태 확인
export const check = () => client.get("/auth/check", { withCredentials: true });
