import client from "./client";

//로그인
export const post = (data) =>
  client.post("/post", data, {
    Headers: { "content-type": "multipart/form-data" },
    withCredentials: true,
  });
