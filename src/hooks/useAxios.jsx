import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://pro-curier-server.onrender.com",
});

const UseAxios = () => {
  return axiosInstance;
};

export default UseAxios;
