import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const UseAxios = () => {
  return axiosInstance;
};

export default UseAxios;
