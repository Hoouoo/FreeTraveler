import axios from "axios";

const client = axios.create();

export const BASE_URL = "http://localhost:8080";

axios.defaults.withCredentials = true;

client.defaults.baseURL = BASE_URL;

client.defaults.headers.common["Authorization"] = "temp_key";

//인서셉터 설정
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default client;
