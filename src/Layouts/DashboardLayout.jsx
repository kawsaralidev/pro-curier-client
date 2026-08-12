import React from "react";
import { CiDeliveryTruck } from "react-icons/ci";
import {
  FaCheckCircle,
  FaClock,
  FaMoneyCheckAlt,
  FaMotorcycle,
  FaSearchLocation,
  FaUserCheck,
  FaUserClock,
  FaUserEdit,
  FaUserShield,
  FaWallet,
} from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router";
import useUserRole from "../hooks/useUserRole";
import UseAuth from "../hooks/useAuth";
import { FaChevronDown, FaUserCircle } from "react-icons/fa";

const DashboardLayout = () => {
  const { role, roleLoading } = useUserRole();
  const { user, logOut } = UseAuth();
  const [profileOpen, setProfileOpen] = React.useState(false);

  const handleLogout = async () => {
    try {
      await logOut();
    } finally {
      setProfileOpen(false);
    }
  };
  return (
    <div className="drawer lg:drawer-open min-h-screen bg-slate-50">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 px-2 shadow-sm backdrop-blur sm:px-4">
          <div className="flex-none">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="my-1.5 inline-block size-4"
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>
          </div>

          <div className="flex-1 px-3">
            <p className="text-sm font-extrabold text-slate-900 sm:text-base">ProCurier Dashboard</p>
            <p className="hidden text-xs text-slate-500 sm:block">
              Manage your delivery activity
            </p>
          </div>

          <div className="relative flex-none">
            <button
              type="button"
              onClick={() => setProfileOpen((open) => !open)}
              className="btn btn-ghost flex h-auto min-h-10 gap-2 px-2"
              aria-expanded={profileOpen}
            >
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || "Profile"}
                  className="h-9 w-9 rounded-full object-cover"
                />
              ) : (
                <FaUserCircle className="text-3xl opacity-70" />
              )}
              <span className="hidden max-w-28 truncate text-left sm:block">
                {user?.displayName || user?.email || "Profile"}
              </span>
              <FaChevronDown className="text-xs opacity-60" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-12 z-50 w-60 rounded-2xl border border-base-300 bg-base-100 p-2 shadow-xl">
                <div className="border-b border-base-300 px-3 py-3">
                  <p className="truncate font-semibold">
                    {user?.displayName || "ProCurier User"}
                  </p>
                  <p className="truncate text-xs opacity-60">{user?.email}</p>
                </div>
                <Link
                  to="/dashboard/profile"
                  onClick={() => setProfileOpen(false)}
                  className="btn btn-ghost mt-2 w-full justify-start"
                >
                  <FaUserEdit /> Profile
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="btn btn-ghost w-full justify-start text-error"
                >
                  <FaUserShield /> Logout
                </button>
              </div>
            )}
          </div>
        </nav>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start border-r border-slate-200 bg-slate-950 text-slate-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow gap-1 p-2">
            {/* List item */}
            <li>
              <Link
                to="/"
                className="rounded-xl text-slate-300 hover:bg-white/10 hover:text-white is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                {/* Home icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span className="is-drawer-close:hidden">Homepage</span>
              </Link>
            </li>

            {/* our dashboard links */}
            <li>
              <NavLink
                className="rounded-xl text-slate-300 hover:bg-white/10 hover:text-white is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="MyParcels"
                to="/dashboard/myParcels"
              >
                <CiDeliveryTruck />
                <span className="is-drawer-close:hidden">My Parcels</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                className="rounded-xl text-slate-300 hover:bg-white/10 hover:text-white is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Payment History"
                to="/dashboard/paymentHistory"
              >
                <FaMoneyCheckAlt />
                <span className="is-drawer-close:hidden">Payment History</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                className="rounded-xl text-slate-300 hover:bg-white/10 hover:text-white is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Update Profile"
                to="/dashboard/profile"
              >
                <FaUserEdit />
                <span className="is-drawer-close:hidden">Update Profile</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                className="rounded-xl text-slate-300 hover:bg-white/10 hover:text-white is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Track a Package"
                to="/dashboard/track"
              >
                <FaSearchLocation />
                <span className="is-drawer-close:hidden">Track a Package</span>
              </NavLink>
            </li>
            {/* riders links  */}
            {!roleLoading && role === "rider" && (
              <>
                <li>
                  <NavLink
                    className="rounded-xl text-slate-300 hover:bg-white/10 hover:text-white is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Pending Deliveries"
                    to="/dashboard/pending-deliveries"
                  >
                    <FaClock />
                    <span className="is-drawer-close:hidden">
                      Pending Deliveries
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="rounded-xl text-slate-300 hover:bg-white/10 hover:text-white is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Completed Deliveries"
                    to="/dashboard/completed-deliveries"
                  >
                    <FaCheckCircle />
                    <span className="is-drawer-close:hidden">
                      Completed Deliveries
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="rounded-xl text-slate-300 hover:bg-white/10 hover:text-white is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Earnings"
                    to="/dashboard/my-earnings"
                  >
                    <FaWallet />
                    <span className="is-drawer-close:hidden">My Earnings</span>
                  </NavLink>
                </li>
              </>
            )}
            {/* admin links  */}
            {!roleLoading && role === "admin" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/assignRider"
                    className="rounded-xl text-slate-300 hover:bg-white/10 hover:text-white is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Assign Rider"
                  >
                    <FaMotorcycle />
                    <span className="is-drawer-close:hidden">Assign Rider</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className="rounded-xl text-slate-300 hover:bg-white/10 hover:text-white is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Active Riders"
                    to="/dashboard/active-riders"
                  >
                    <FaUserCheck />
                    <span className="is-drawer-close:hidden">
                      Active Riders
                    </span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className="rounded-xl text-slate-300 hover:bg-white/10 hover:text-white is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Pending Riders"
                    to="/dashboard/pending-riders"
                  >
                    <FaUserClock />
                    <span className="is-drawer-close:hidden">
                      Pending Riders
                    </span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/makeAdmin"
                    className="rounded-xl text-slate-300 hover:bg-white/10 hover:text-white is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Make Admin"
                  >
                    <FaUserShield />
                    <span className="is-drawer-close:hidden">Make Admin</span>
                  </NavLink>
                </li>
              </>
            )}
            {/* List item */}
            <li>
              <button
                className="rounded-xl text-slate-300 hover:bg-white/10 hover:text-white is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings"
              >
                {/* Settings icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M20 7h-9"></path>
                  <path d="M14 17H5"></path>
                  <circle cx="17" cy="17" r="3"></circle>
                  <circle cx="7" cy="7" r="3"></circle>
                </svg>
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
