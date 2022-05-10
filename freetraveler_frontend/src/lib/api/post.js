import client from "./client";

//로그인
export const post = (data) =>
  client.post("/post ", data, { withCredentials: true });
