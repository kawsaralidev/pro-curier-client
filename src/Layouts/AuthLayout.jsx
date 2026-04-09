import authImg from "../assets/imgs/authImage.png";
import logo from "../assets//logos/logo.png";
import { Link, Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="p-7 bg-base-200 min-h-screen">
      <Link to="/">
        <div className="flex items-end">
          <img className="mb-2" src={logo} alt="" />
          <p className="text-3xl font-extrabold -ml-3">ProCurier</p>
        </div>
      </Link>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="flex-1">
          <img src={authImg} className="max-w-sm rounded-lg shadow-2xl" />
        </div>
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
