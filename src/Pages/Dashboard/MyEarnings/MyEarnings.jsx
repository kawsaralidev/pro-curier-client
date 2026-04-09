import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import UseAuth from "../../../hooks/useAuth";

const MyEarnings = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  const { data: deliveries = [], isLoading } = useQuery({
    queryKey: ["rider-earnings", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/rider/completed-parcels");
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;

  // ✅ earning calculator
  const getEarning = (parcel) => {
    const sameDistrict = parcel.senderDistrict === parcel.receiverDistrict;

    return sameDistrict ? parcel.cost * 0.8 : parcel.cost * 0.3;
  };

  // ======================
  // TOTAL
  // ======================

  const totalEarnings = deliveries.reduce((sum, d) => sum + getEarning(d), 0);

  const totalCashedOut = deliveries
    .filter((d) => d.cashout_status === "paid")
    .reduce((sum, d) => sum + getEarning(d), 0);

  const totalPending = totalEarnings - totalCashedOut;

  // ======================
  // DATE FILTER
  // ======================

  const today = dayjs();
  const startOfWeek = today.startOf("week");
  const startOfMonth = today.startOf("month");
  const startOfYear = today.startOf("year");

  const todayEarning = deliveries
    .filter((d) => dayjs(d.delivered_at).isSame(today, "day"))
    .reduce((sum, d) => sum + getEarning(d), 0);

  const weekEarning = deliveries
    .filter((d) => dayjs(d.delivered_at).isAfter(startOfWeek))
    .reduce((sum, d) => sum + getEarning(d), 0);

  const monthEarning = deliveries
    .filter((d) => dayjs(d.delivered_at).isAfter(startOfMonth))
    .reduce((sum, d) => sum + getEarning(d), 0);

  const yearEarning = deliveries
    .filter((d) => dayjs(d.delivered_at).isAfter(startOfYear))
    .reduce((sum, d) => sum + getEarning(d), 0);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">My Earnings Overview</h2>

      {/* Summary */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="card bg-base-100 shadow p-4">
          <h3>Total Earnings</h3>
          <p className="text-green-500 font-bold">
            ৳ {totalEarnings.toFixed(2)}
          </p>
        </div>

        <div className="card bg-base-100 shadow p-4">
          <h3>Total Cashed Out</h3>
          <p className="text-blue-500 font-bold">
            ৳ {totalCashedOut.toFixed(2)}
          </p>
        </div>

        <div className="card bg-base-100 shadow p-4">
          <h3>Pending Amount</h3>
          <p className="text-red-500 font-bold">৳ {totalPending.toFixed(2)}</p>
        </div>
      </div>

      {/* Analysis */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card title="Today" value={todayEarning} />
        <Card title="This Week" value={weekEarning} />
        <Card title="This Month" value={monthEarning} />
        <Card title="This Year" value={yearEarning} />
      </div>
    </div>
  );
};

const Card = ({ title, value }) => (
  <div className="card bg-base-100 shadow p-4">
    <h4>{title}</h4>
    <p className="font-semibold">৳ {value.toFixed(2)}</p>
  </div>
);

export default MyEarnings;
