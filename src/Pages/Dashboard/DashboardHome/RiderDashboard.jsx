import { useQuery } from "@tanstack/react-query";
import {
  FaBoxOpen,
  FaCheckCircle,
  FaMotorcycle,
  FaMoneyBillWave,
} from "react-icons/fa";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Components/Loading";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const RiderDashboard = () => {
  const axiosSecure = UseAxiosSecure();

  const { data: stats, isLoading, isError } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const response = await axiosSecure.get("/dashboard/stats");
      return response.data;
    },
  });

  if (isLoading) return <Loading />;

  if (isError) {
    return (
      <div className="p-4 sm:p-6">
        <div className="alert alert-error">
          <span>Unable to load rider statistics.</span>
        </div>
      </div>
    );
  }

  const cards = [
    { label: "Assigned Parcels", value: stats?.totalParcels || 0, icon: <FaBoxOpen />, tone: "text-primary" },
    { label: "Delivered", value: stats?.delivered || 0, icon: <FaCheckCircle />, tone: "text-success" },
    { label: "In Transit", value: stats?.inTransit || 0, icon: <FaMotorcycle />, tone: "text-info" },
    { label: "Earnings", value: `৳ ${Number(stats?.totalEarnings || 0).toLocaleString()}`, icon: <FaMoneyBillWave />, tone: "text-warning" },
  ];

  const chartData = [
    { status: "Pending", count: stats?.pending || 0 },
    { status: "Assigned", count: stats?.riderAssigned || 0 },
    { status: "In Transit", count: stats?.inTransit || 0 },
    { status: "Delivered", count: stats?.delivered || 0 },
  ];

  return (
    <div className="space-y-6 p-3 sm:p-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          Rider overview
        </p>
        <h1 className="mt-1 text-2xl font-bold sm:text-3xl">Delivery Dashboard</h1>
        <p className="mt-1 text-sm opacity-65">
          Track your assigned deliveries and earnings.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="card border border-base-300 bg-base-100 shadow-sm">
            <div className="card-body flex-row items-center justify-between p-5">
              <div>
                <p className="text-sm opacity-60">{card.label}</p>
                <h2 className={`mt-1 text-2xl font-bold ${card.tone}`}>{card.value}</h2>
              </div>
              <span className={`text-3xl ${card.tone}`}>{card.icon}</span>
            </div>
          </div>
        ))}
      </div>

      <section className="card border border-base-300 bg-base-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Delivery Status</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" name="Parcels" fill="#2563EB" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm">
          <p className="text-sm opacity-60">Completed deliveries</p>
          <p className="mt-1 text-3xl font-bold text-success">{stats?.completedDeliveries || 0}</p>
        </div>
        <div className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm">
          <p className="text-sm opacity-60">Pending deliveries</p>
          <p className="mt-1 text-3xl font-bold text-warning">{stats?.pending || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default RiderDashboard;
