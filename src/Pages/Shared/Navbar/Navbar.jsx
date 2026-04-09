import logo from "../../../assets/logos/logo.png";
import { Link, NavLink } from "react-router";
import UseAuth from "../../../hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";

const Navbar = () => {
  const { user, logOut } = UseAuth();
  const queryClient = useQueryClient();
  const handleLogout = async () => {
    try {
      await logOut(); // first logout
      queryClient.clear(); // cache clear
      console.log("Logged out");
    } catch (error) {
      console.log(error);
    }
  };
  const navItems = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/sendParcel">Send a Parcel</NavLink>
      </li>
      <li>
        <NavLink to="/coverage">Coverage</NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink to="/beARider">Be A Rider</NavLink>
      </li>
      <li>
        <NavLink to="/aboutus">About us</NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navItems}
          </ul>
        </div>
        <div className="btn btn-ghost text-xl">
          <Link to="/">
            <div className="flex items-end">
              <img className="mb-2" src={logo} alt="" />
              <p className="text-3xl font-extrabold -ml-3">ProCurier</p>
            </div>
          </Link>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <button onClick={handleLogout} className="btn btn-success">
            Logout
          </button>
        ) : (
          <Link to="/login" className="btn btn-error">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
