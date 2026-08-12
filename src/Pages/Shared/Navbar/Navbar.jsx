import { useState } from "react";
import { Link, NavLink } from "react-router";
import {
  FaChevronDown,
  FaUserCircle,
  FaTachometerAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import UseAuth from "../../../hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import logo from "../../../assets/logos/procurier-mark.svg";

const Navbar = () => {
  const { user, logOut } = UseAuth();
  const queryClient = useQueryClient();
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logOut();
    } finally {
      queryClient.clear();
      setProfileOpen(false);
    }
  };

  const linkClass = ({ isActive }) =>
    `relative rounded-lg px-3 py-2 text-sm text-black font-semibold transition ${
      isActive
        ? "bg-teal-50 text-teal-00"
        : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
    }`;

  const navItems = (
    <>
      <li>
        <NavLink className={linkClass} to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink className={linkClass} to="/sendParcel">
          Send a Parcel
        </NavLink>
      </li>
      <li>
        <NavLink className={linkClass} to="/coverage">
          Coverage
        </NavLink>
      </li>
      <li>
        <NavLink className={linkClass} to="/beARider">
          Be A Rider
        </NavLink>
      </li>
      <li>
        <NavLink className={linkClass} to="/aboutus">
          About Us
        </NavLink>
      </li>
    </>
  );

  return (
    <header className="sticky top-0 z-[100] border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex min-h-[72px] w-full max-w-7xl items-center px-3 sm:px-5 lg:px-8">
        {/* Mobile menu */}
        <div className="lg:hidden">
          <div className="dropdown">
            <button
              tabIndex={0}
              type="button"
              aria-label="Open navigation menu"
              className="btn btn-ghost btn-square rounded-xl text-slate-700 hover:bg-slate-100"
            >
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
                  d="M4 6h16M4 12h10M4 18h16"
                />
              </svg>
            </button>
            <ul
              tabIndex="-1"
              className="menu dropdown-content z-[110] mt-3 w-64 rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl"
            >
              {navItems}
              {user && (
                <li className="mt-2 border-t border-slate-100 pt-2">
                  <Link
                    to="/dashboard"
                    className="rounded-lg font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-700"
                  >
                    Dashboard
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Brand */}
        <Link
          to="/"
          className="group flex shrink-0 items-center gap-2.5 lg:min-w-[220px]"
        >
          <img
            src={logo}
            alt="ProCurier"
            className="h-10 w-10 transition duration-300 group-hover:-rotate-3 group-hover:scale-105 sm:h-11 sm:w-11"
          />
          <div className="leading-none">
            <span className="block text-[19px] font-extrabold tracking-tight text-slate-900 sm:text-[21px]">
              Pro<span className="text-teal-700">Curier</span>
            </span>
            <span className="mt-1 hidden text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400 sm:block">
              Deliver with confidence
            </span>
          </div>
        </Link>

        {/* Centered navigation */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
          <ul className="menu menu-horizontal flex-nowrap gap-1 p-0">
            {navItems}
          </ul>
        </nav>

        {/* Right side auth/profile */}
        <div className="ml-auto flex items-center gap-2">
          {user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen((open) => !open)}
                aria-expanded={profileOpen}
                aria-label="Open profile menu"
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-1.5 pr-2 shadow-sm hover:border-teal-200 hover:shadow-md"
              >
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "User avatar"}
                    className="h-9 w-9 rounded-lg object-cover ring-2 ring-teal-50"
                  />
                ) : (
                  <FaUserCircle className="h-9 w-9 text-slate-400" />
                )}
                <span className="hidden max-w-24 truncate text-left text-sm font-bold text-slate-800 xl:block">
                  {user?.displayName || "Account"}
                </span>
                <FaChevronDown
                  className={`hidden text-[10px] text-slate-400 transition sm:block ${profileOpen ? "rotate-180" : ""}`}
                />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-[calc(100%+10px)] z-[120] w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
                  <div className="bg-slate-950 px-4 py-4 text-white">
                    <div className="flex items-center gap-3">
                      {user?.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt=""
                          className="h-10 w-10 rounded-xl object-cover"
                        />
                      ) : (
                        <FaUserCircle className="h-10 w-10 text-slate-400" />
                      )}
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold">
                          {user?.displayName || "ProCurier User"}
                        </p>
                        <p className="truncate text-xs text-slate-400">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-2">
                    <Link
                      to="/dashboard"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-700"
                    >
                      <FaTachometerAlt /> Dashboard
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-slate-700 hover:bg-amber-50 hover:text-amber-700"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="btn h-10 rounded-xl border-0 bg-teal-700 px-4 text-sm font-bold text-white shadow-sm hover:bg-teal-800 sm:px-5"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
