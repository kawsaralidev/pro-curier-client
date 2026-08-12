import { useQuery } from "@tanstack/react-query";
import {
  FaBoxOpen,
  FaCheckCircle,
  FaClock,
  FaMoneyBillWave,
} from "react-icons/fa";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Components/Loading";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const UserDashboard = () => {
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
          <span>Unable to load dashboard statistics.</span>
        </div>
      </div>
    );
  }

  const cards = [
    { label: "Total Parcels", value: stats?.totalParcels || 0, icon: <FaBoxOpen />, tone: "text-primary" },
    { label: "Delivered", value: stats?.delivered || 0, icon: <FaCheckCircle />, tone: "text-success" },
    { label: "Pending", value: stats?.pending || 0, icon: <FaClock />, tone: "text-warning" },
    { label: "Total Paid", value: stats?.totalRevenue || 0, icon: <FaMoneyBillWave />, tone: "text-info" },
  ];

  const chartData = [
    { status: "Pending", count: stats?.pending || 0 },
    { status: "Rider Assigned", count: stats?.riderAssigned || 0 },
    { status: "In Transit", count: stats?.inTransit || 0 },
    { status: "Delivered", count: stats?.delivered || 0 },
  ];

  return (
    <div className="space-y-6 p-3 sm:p-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          Overview
        </p>
        <h1 className="mt-1 text-2xl font-bold sm:text-3xl">My Dashboard</h1>
        <p className="mt-1 text-sm opacity-65">
          A quick view of your parcel delivery activity.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="card border border-base-300 bg-base-100 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="card-body flex-row items-center justify-between p-5">
              <div>
                <p className="text-sm opacity-60">{card.label}</p>
                <h2 className={`mt-1 text-3xl font-bold ${card.tone}`}>
                  {card.value}
                </h2>
              </div>
              <span className={`text-3xl ${card.tone}`}>{card.icon}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <section className="card border border-base-300 bg-base-100 shadow-sm">
          <div className="card-body">
            <h2 className="card-title">Delivery Progress</h2>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="status" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" name="Parcels" fill="#2563EB" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        <section className="card border border-base-300 bg-base-100 shadow-sm">
          <div className="card-body">
            <h2 className="card-title">Payment Summary</h2>
            <div className="mt-4 rounded-xl bg-primary/5 p-5">
              <p className="text-sm opacity-60">Total payments</p>
              <p className="mt-1 text-3xl font-bold">{stats?.totalPayments || 0}</p>
            </div>
            <div className="mt-4 rounded-xl bg-success/5 p-5">
              <p className="text-sm opacity-60">Total amount paid</p>
              <p className="mt-1 text-3xl font-bold">
                ৳ {Number(stats?.totalRevenue || 0).toLocaleString()}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserDashboard;
