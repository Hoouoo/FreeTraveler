import axios from "axios";

const client = axios.create();

axios.defaults.withCredentials = true;

client.defaults.baseURL = "http://localhost:8080";

client.defaults.headers.common["Authorization"] = "temp_key";

//인서셉터 설정
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default client;
