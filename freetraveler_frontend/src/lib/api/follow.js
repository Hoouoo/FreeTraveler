import client from "./client";

export const searchFollow = (data) =>
  client.get("/follow", data, { withCredentials: true });

export const addFollow = (data) =>
  client.post("/follow ", data, { withCredentials: true });

export const removeFollow = (data) =>
  client.delete("/follow ", { data: data, withCredentials: true });

export const followList = (data) =>
  client.post("/follow/list ", data, { withCredentials: true });
