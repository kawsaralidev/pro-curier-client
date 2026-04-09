import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import UseAuth from "../../../hooks/useAuth";

const CompletedDeliveries = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();
  const queryClient = useQueryClient();
  const email = user?.email;

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["completedDeliveries"],
    enabled: !!user,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/rider/completed-parcels?email=${email}`,
      );
      return res.data;
    },
  });

  // 🔥 earning rule
  const calculateEarning = (parcel) => {
    const sameDistrict = parcel.senderDistrict === parcel.receiverDistrict;

    return sameDistrict ? parcel.cost * 0.8 : parcel.cost * 0.3;
  };

  // 🔥 Cashout mutation
  const { mutateAsync: cashout } = useMutation({
    mutationFn: async (parcelId) => {
      const res = await axiosSecure.patch(`/parcels/${parcelId}/cashout`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success", "Cashout completed", "success");
      queryClient.invalidateQueries(["completedDeliveries"]);
    },
    onError: () => {
      Swal.fire("Error", "Cashout failed", "error");
    },
  });

  if (isLoading) return <p>Loading...</p>;

  const totalEarning = parcels.reduce(
    (total, parcel) =>
      total + (parcel.cashout_status === "paid" ? 0 : calculateEarning(parcel)),
    0,
  );

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Completed Deliveries</h2>

      <div className="mb-6 p-4 bg-green-100 rounded-lg">
        <h3 className="text-xl text-black font-semibold">
          Available Earnings: ৳ {totalEarning.toFixed(2)}
        </h3>
      </div>

      <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Tracking</th>
              <th>Sender Email</th>
              <th>Parcel</th>
              <th>Cost</th>
              <th>Earning</th>
              <th>Status</th>
              <th>Cashout</th>
            </tr>
          </thead>

          <tbody>
            {parcels.map((parcel, index) => {
              const earning = calculateEarning(parcel);

              return (
                <tr key={parcel._id}>
                  <td>{index + 1}</td>
                  <td>{parcel.tracking_id}</td>
                  <td>{parcel.senderEmail}</td>
                  <td>{parcel.parcelName}</td>
                  <td>৳ {parcel.cost}</td>
                  <td className="text-green-600 font-semibold">
                    ৳ {earning.toFixed(2)}
                  </td>

                  <td>
                    <span
                      className={`badge ${
                        parcel.cashout_status === "paid"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {parcel.cashout_status || "unpaid"}
                    </span>
                  </td>

                  <td>
                    {parcel.cashout_status !== "paid" && (
                      <button
                        className="btn btn-xs btn-primary"
                        onClick={() => cashout(parcel._id)}
                      >
                        Cashout
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompletedDeliveries;
