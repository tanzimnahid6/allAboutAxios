import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

const token = "This is authentication bearer token";
api.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = "Bearer " + token;
    config.headers["Secret"] =
      "This is secret token thats invoke from interceptor";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
