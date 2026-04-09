import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import UseAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "https://kawsaralidev-pro-curier-server.vercel.app",
});
const UseAxiosSecure = () => {
  const { user, logOut } = UseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const reqInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        const token = await user.getIdToken();
        config.headers.authorization = `Bearer ${token}`;
        return config;
      },
    );

    const resInterceptor = axiosSecure.interceptors.response.use(
      (res) => res,
      async (error) => {
        const status = error.response?.status;

        if (status === 401) {
          await logOut();
          navigate("/login");
        }

        if (status === 403) {
          navigate("/forbiden");
        }

        return Promise.reject(error);
      },
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user]);

  return axiosSecure;
};

export default UseAxiosSecure;
