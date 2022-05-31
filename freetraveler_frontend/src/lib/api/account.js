import client from "./client";

//사용자 정보 조회
export const getAccount = (data) =>
  client.get("/account ", { withCredentials: true });

//사용자 정보 변경
export const changeAccount = (data) =>
  client.post("/account/change ", { withCredentials: true });
