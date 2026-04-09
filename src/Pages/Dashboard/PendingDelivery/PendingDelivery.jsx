import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import UseAuth from "../../../hooks/useAuth";
import UseTrackingLogger from "../../../hooks/useTrackingLogger";

const PendingDeliveries = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();
  const queryClient = useQueryClient();
  const { logTracking } = UseTrackingLogger();

  // 🔹 Load rider tasks
  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["riderTasks"],
    enabled: !!user, // 🔥 prevent undefined call
    queryFn: async () => {
      const res = await axiosSecure.get("/rider/parcels");
      return res.data;
    },
  });

  // 🔹 Mutation for updating delivery status
  const { mutateAsync: updateStatus } = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosSecure.patch(`/parcels/${id}/status`, {
        status,
      });
      return res.data;
    },

    // ✅ VERY IMPORTANT FIX
    onSuccess: async (_, variables) => {
      const { parcel, status } = variables;

      queryClient.invalidateQueries(["riderTasks"]);

      Swal.fire("Success", "Status updated", "success");

      // tracking message
      let details = `Picked up by ${user.displayName}`;

      if (status === "delivered") {
        details = `Delivered by ${user.displayName}`;
      }

      // ✅ tracking insert
      await logTracking({
        tracking_id: parcel.tracking_id,
        status,
        details,
        updated_by: user.email,
      });
    },

    onError: () => {
      Swal.fire("Error", "Failed to update", "error");
    },
  });

  // ===============================
  // ✅ Rider Action Handler
  // ===============================
  const handleAction = async (parcel) => {
    let newStatus = "";

    if (parcel.delivery_status === "rider_assigned") {
      newStatus = "in_transit";
    } else if (parcel.delivery_status === "in_transit") {
      newStatus = "delivered";
    }

    await updateStatus({
      id: parcel._id,
      status: newStatus,
      parcel, // ✅ MUST PASS
    });
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Pending Deliveries</h2>

      <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Tracking</th>
              <th>Parcel</th>
              <th>Receiver</th>
              <th>Address</th>
              <th>Contact</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {parcels.length > 0 ? (
              parcels.map((parcel, index) => (
                <tr key={parcel._id}>
                  <td>{index + 1}</td>
                  <td className="font-mono text-xs">{parcel.tracking_id}</td>
                  <td>{parcel.parcelName}</td>
                  <td>{parcel.receiverName}</td>
                  <td>{parcel.receiverAddress}</td>
                  <td>{parcel.receiverContact}</td>

                  <td>
                    <span
                      className={`badge ${
                        parcel.delivery_status === "in_transit"
                          ? "badge-warning"
                          : "badge-info"
                      }`}
                    >
                      {parcel.delivery_status}
                    </span>
                  </td>

                  <td>
                    {parcel.delivery_status === "rider_assigned" && (
                      <button
                        className="btn btn-xs btn-primary"
                        onClick={() => handleAction(parcel)}
                      >
                        Pick Up
                      </button>
                    )}

                    {parcel.delivery_status === "in_transit" && (
                      <button
                        className="btn btn-xs btn-success"
                        onClick={() => handleAction(parcel)}
                      >
                        Delivered
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-6 text-gray-400">
                  No pending deliveries
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingDeliveries;
