import { useQuery } from "@tanstack/react-query";
import { FaTruck, FaUserCheck, FaBoxOpen, FaCheckCircle } from "react-icons/fa";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#3B82F6", "#F59E0B", "#8B5CF6", "#22C55E"];

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

const AdminDashboard = () => {
  const axiosSecure = UseAxiosSecure();

  const {
    data: parcelStats = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["parcel-status"],
    queryFn: async () => {
      const res = await axiosSecure("/parcels/delivery/status-count");
      return res.data;
    },
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
      <div className="p-6">
        <div className="alert alert-error shadow-lg">
          <span>{error.message}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Parcel Delivery Overview</h2>

      {/* Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {parcelStats.map((item) => {
          const config = statusConfig[item.status] || {};

          return (
            <div
              key={item.status}
              className="card bg-base-200 shadow-lg hover:shadow-xl transition"
            >
              <div className="card-body flex flex-row items-center justify-between">
                <div>
                  <p className="text-sm opacity-70">
                    {config.label || item.status}
                  </p>

                  <h3 className={`text-3xl font-bold ${config.color}`}>
                    {item.count}
                  </h3>
                </div>

                <div>{config.icon}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pie Chart */}
      <div className="card bg-base-200 shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">
          Delivery Status Distribution
        </h3>

        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={parcelStats}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
              >
                {parcelStats.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
