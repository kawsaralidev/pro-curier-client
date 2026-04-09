import React from "react";
import useUserRole from "../../../hooks/useUserRole";
import Loading from "../../../Components/Loading";
import UserDashboard from "./UserDashboard";
import RiderDashboard from "./RiderDashboard";
import AdminDashboard from "./AdminDashboard";
import Forbiden from "../../Forbiden/Forbiden";

const DashboardHome = () => {
  const { role, roleLoading } = useUserRole();
  if (roleLoading) {
    return <Loading></Loading>;
  }
  if (role === "user") {
    return <UserDashboard></UserDashboard>;
  } else if (role === "rider") {
    return <RiderDashboard></RiderDashboard>;
  } else if (role === "admin") {
    return <AdminDashboard></AdminDashboard>;
  } else {
    return <Forbiden></Forbiden>;
  }
};

export default DashboardHome;
