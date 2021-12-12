import axios from "axios";
import useStore from "../store";
const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const userData = useStore.getState().userData;
    const token = userData?.token?.accessToken
      ? userData.token.accessToken
      : null;
    config.headers = {
      Authorization: token && `Bearer ${token}`,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
