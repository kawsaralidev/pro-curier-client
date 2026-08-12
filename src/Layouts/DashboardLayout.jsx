import React from "react";
import { CiDeliveryTruck } from "react-icons/ci";
import {
  FaCheckCircle,
  FaClock,
  FaHome,
  FaMoneyCheckAlt,
  FaMotorcycle,
  FaSearchLocation,
  FaUserCheck,
  FaUserClock,
  FaUserEdit,
  FaUserShield,
  FaWallet,
  FaChevronDown,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router";
import useUserRole from "../hooks/useUserRole";
import UseAuth from "../hooks/useAuth";

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

  const navClass = ({ isActive }) =>
    `dashboard-nav-link rounded-xl ${
      isActive ? "dashboard-nav-active" : ""
    }`;

  return (
    <div data-theme="light" className="dashboard-shell drawer lg:drawer-open min-h-screen">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content dashboard-main">
        {/* Dashboard topbar */}
        <nav className="dashboard-topbar navbar sticky top-0 z-40 w-full px-3 sm:px-5">
          <div className="flex-none">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="dashboard-menu-button btn btn-square btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="size-5"
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
                <path d="M9 4v16" />
                <path d="M14 10l2 2l-2 2" />
              </svg>
            </label>
          </div>

          <div className="flex-1 px-2 sm:px-4">
            <div className="flex items-center gap-3">
              <div className="dashboard-topbar-mark">
                <CiDeliveryTruck />
              </div>
              <div>
                <p className="text-sm font-extrabold tracking-tight text-slate-950 sm:text-base">
                  ProCurier Dashboard
                </p>
                <p className="hidden text-[11px] font-medium text-slate-500 sm:block">
                  Manage your delivery activity
                </p>
              </div>
            </div>
          </div>

          <div className="relative flex-none">
            <button
              type="button"
              onClick={() => setProfileOpen((open) => !open)}
              className="dashboard-profile-trigger btn btn-ghost flex h-auto min-h-10 gap-2 px-1.5 sm:px-2"
              aria-expanded={profileOpen}
            >
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || "Profile"}
                  className="h-9 w-9 rounded-full object-cover ring-2 ring-teal-100"
                />
              ) : (
                <span className="dashboard-avatar">
                  {(user?.displayName || user?.email || "P")
                    .charAt(0)
                    .toUpperCase()}
                </span>
              )}

              <span className="hidden max-w-32 truncate text-left sm:block">
                <span className="block text-xs font-bold text-slate-900">
                  {user?.displayName || "ProCurier User"}
                </span>
                <span className="block text-[10px] text-slate-500">
                  {role || "user"}
                </span>
              </span>

              <FaChevronDown className="text-[10px] text-slate-400" />
            </button>

            {profileOpen && (
              <div className="dashboard-profile-menu absolute right-0 top-12 z-50 w-64 rounded-2xl p-2">
                <div className="border-b border-slate-100 px-3 py-3">
                  <p className="truncate text-sm font-extrabold text-slate-900">
                    {user?.displayName || "ProCurier User"}
                  </p>
                  <p className="truncate text-xs text-slate-500">
                    {user?.email}
                  </p>
                </div>

                <Link
                  to="/dashboard/profile"
                  onClick={() => setProfileOpen(false)}
                  className="dashboard-menu-item mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold"
                >
                  <FaUserEdit />
                  Profile
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="dashboard-menu-item dashboard-logout flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </div>
            )}
          </div>
        </nav>

        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        />

        <aside className="dashboard-sidebar flex min-h-full w-64 flex-col items-start">
          <div className="dashboard-brand w-full">
            <Link to="/" className="flex items-center gap-3">
              <div className="dashboard-brand-mark">
                <CiDeliveryTruck />
              </div>

              <div className="">
                <p className="text-base font-black tracking-tight text-white">
                  ProCurier
                </p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  Delivery system
                </p>
              </div>
            </Link>
          </div>

          <div className="dashboard-role-badge ">
            <span className="dashboard-status-dot" />
            <span>{roleLoading ? "Loading role..." : `${role || "user"} workspace`}</span>
          </div>

          <ul className="menu dashboard-sidebar-menu w-full grow gap-1.5 p-2">
            {/* Common navigation */}
            <li>
              <NavLink
                to="/"
                className={navClass}
                data-tip="Homepage"
              >
                <FaHome />
                <span>Homepage</span>
              </NavLink>
            </li>

            {/* USER / CUSTOMER */}
            {!roleLoading && role === "user" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/myParcels"
                    className={navClass}
                    data-tip="My Parcels"
                  >
                    <CiDeliveryTruck />
                    <span>My Parcels</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/paymentHistory"
                    className={navClass}
                    data-tip="Payment History"
                  >
                    <FaMoneyCheckAlt />
                    <span>Payment History</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/track"
                    className={navClass}
                    data-tip="Track a Package"
                  >
                    <FaSearchLocation />
                    <span>Track a Package</span>
                  </NavLink>
                </li>
              </>
            )}

            {/* RIDER */}
            {!roleLoading && role === "rider" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/pending-deliveries"
                    className={navClass}
                    data-tip="Pending Deliveries"
                  >
                    <FaClock />
                    <span>Pending Deliveries</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/completed-deliveries"
                    className={navClass}
                    data-tip="Completed Deliveries"
                  >
                    <FaCheckCircle />
                    <span>Completed Deliveries</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/my-earnings"
                    className={navClass}
                    data-tip="My Earnings"
                  >
                    <FaWallet />
                    <span>My Earnings</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/track"
                    className={navClass}
                    data-tip="Track a Package"
                  >
                    <FaSearchLocation />
                    <span>Track a Package</span>
                  </NavLink>
                </li>
              </>
            )}

            {/* ADMIN */}
            {!roleLoading && role === "admin" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/assignRider"
                    className={navClass}
                    data-tip="Assign Rider"
                  >
                    <FaMotorcycle />
                    <span>Assign Rider</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/active-riders"
                    className={navClass}
                    data-tip="Active Riders"
                  >
                    <FaUserCheck />
                    <span>Active Riders</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/pending-riders"
                    className={navClass}
                    data-tip="Pending Riders"
                  >
                    <FaUserClock />
                    <span>Pending Riders</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/makeAdmin"
                    className={navClass}
                    data-tip="Make Admin"
                  >
                    <FaUserShield />
                    <span>Make Admin</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/track"
                    className={navClass}
                    data-tip="Track a Package"
                  >
                    <FaSearchLocation />
                    <span>Track a Package</span>
                  </NavLink>
                </li>
              </>
            )}

            {/* Profile is available to every authenticated role */}
            {!roleLoading && (
              <li>
                <NavLink
                  to="/dashboard/profile"
                  className={navClass}
                  data-tip="Update Profile"
                >
                  <FaUserEdit />
                  <span>Update Profile</span>
                </NavLink>
              </li>
            )}

            {/* Settings */}
            <li className="mt-2 border-t border-white/10 pt-2">
              <button
                type="button"
                className="dashboard-nav-link w-full rounded-xl text-left"
                data-tip="Settings"
              >
                <FaCog />
                <span>Settings</span>
              </button>
            </li>
          </ul>
          <div className="dashboard-sidebar-footer w-full ">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-teal-300">
                ProCurier
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-400">
                Simple workflow. Clear milestones. Better control.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;
