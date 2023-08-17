import axios from "axios";

const instance = axios.create({
  baseURL: "/",
  timeout: 1000,
});

instance.interceptors.response.use((res) => {
  return res.data;
});

export default instance;
