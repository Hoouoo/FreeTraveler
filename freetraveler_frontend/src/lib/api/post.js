import client from "./client";

export const post = (data) =>
  client.post("/post", data, {
    Headers: { "content-type": "multipart/form-data" },
    withCredentials: true,
  });

export const getPostList = (data) =>
  client.get("/post/list", data, {
    withCredentials: true,
  });

export const getPost = (data) =>
  client.get("/post", data, {
    withCredentials: true,
  });
