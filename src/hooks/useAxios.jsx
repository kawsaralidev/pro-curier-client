import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `https://kawsaralidev-pro-curier-server.vercel.app`,
});

const UseAxios = () => {
  return axiosInstance;
};

export default UseAxios;
