import { useQuery } from "@tanstack/react-query";
import { FaTruck, FaUserCheck, FaBoxOpen, FaCheckCircle } from "react-icons/fa";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import UseAuth from "../../../hooks/useAuth";

const statusConfig = {
  rider_assigned: {
    label: "Rider Assigned",
    icon: <FaUserCheck className="text-info text-3xl" />,
    color: "text-info",
  },
  not_collected: {
    label: "Not Collected",
    icon: <FaBoxOpen className="text-warning text-3xl" />,
    color: "text-warning",
  },
  in_transit: {
    label: "In Transit",
    icon: <FaTruck className="text-primary text-3xl" />,
    color: "text-primary",
  },
  delivered: {
    label: "Delivered",
    icon: <FaCheckCircle className="text-success text-3xl" />,
    color: "text-success",
  },
};

const RiderDashboard = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();

  const {
    data: riderStats = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["rider-parcel-status"],
    queryFn: async () => {
      const res = await axiosSecure(
        `/riders/parcels/status-count/${user.email}`,
      );
      return res.data;
    },
  });

  // Convert array → object for easy lookup
  const statusMap = {};
  riderStats.forEach((item) => {
    statusMap[item.status] = item.count;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-60">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="alert alert-error">
        <span>{error.message}</span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Rider Delivery Overview</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(statusConfig).map(([status, config]) => (
          <div
            key={status}
            className="card bg-base-200 shadow-lg hover:shadow-xl transition"
          >
            <div className="card-body flex flex-row items-center justify-between">
              <div>
                <p className="text-sm opacity-70">{config.label}</p>

                <h3 className={`text-3xl font-bold ${config.color}`}>
                  {statusMap[status] || 0}
                </h3>
              </div>

              <div>{config.icon}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiderDashboard;
