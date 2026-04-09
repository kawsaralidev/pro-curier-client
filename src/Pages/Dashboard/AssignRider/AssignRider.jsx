import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaMotorcycle } from "react-icons/fa";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import UseTrackingLogger from "../../../hooks/useTrackingLogger";
import UseAuth from "../../../hooks/useAuth";

const AssignRider = () => {
  const axiosSecure = UseAxiosSecure();

  // states (EXACT like your screenshot)
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [riders, setRiders] = useState([]);
  const [selectedRider, setSelectedRider] = useState(null);
  const [loadingRiders, setLoadingRiders] = useState(false);
  const queryClient = useQueryClient();
  const { logTracking } = UseTrackingLogger();
  const { user } = UseAuth();

  // Step 1: Load eligible parcels
  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["assignableParcels"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels?payment_status=paid&delivery_status=not_collected",
      );
      return res.data;
    },
  });

  const { mutateAsync: assignRider } = useMutation({
    mutationFn: async ({ parcelId, rider }) => {
      setSelectedRider(rider);
      const res = await axiosSecure.patch(`/parcels/${parcelId}/assign-rider`, {
        riderId: rider._id,
        riderName: rider.name,
        riderEmail: rider.email,
      });
      return res.data;
    },

    onSuccess: async () => {
      queryClient.invalidateQueries(["assignableParcels"]);

      Swal.fire("Success", "Rider assigned successfully!", "success");

      //track rider assigned
      await logTracking({
        tracking_id: selectedParcel.tracking_id,
        status: "assigned_rider",
        details: `Assigned to ${selectedRider.name}`,
        updated_by: user.email,
      });

      // close modal
      document.getElementById("assignModal")?.close();
      setSelectedParcel(null);
    },

    onError: (error) => {
      console.error(error);
      Swal.fire("Error", "Failed to assign rider", "error");
    },
  });

  // Step 2: Open modal and load matching riders
  const openAssignModal = async (parcel) => {
    // open modal + prepare state
    setSelectedParcel(parcel);
    setLoadingRiders(true);
    setRiders([]);

    try {
      const res = await axiosSecure.get("/riders/available", {
        params: {
          district: parcel.receiverDistrict,
          // service center district from parcel
          // rider.district must match this
        },
      });

      setRiders(res.data);
    } catch (error) {
      console.error("Error fetching riders", error);
      Swal.fire("Error", "Failed to load riders", "error");
    } finally {
      setLoadingRiders(false);
    }
  };

  if (isLoading) {
    return <p className="text-center mt-10">Loading parcels...</p>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <FaMotorcycle /> Assign Rider
      </h2>

      {/* 📦 Parcels Table */}
      <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Tracking ID</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Receiver Phone</th>
              <th>District</th>
              <th>Cost</th>
              <th>Payment</th>
              <th>Delivery</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {parcels.length > 0 ? (
              parcels.map((parcel, index) => (
                <tr key={parcel._id}>
                  <td>{index + 1}</td>
                  <td className="font-mono text-xs">{parcel.tracking_id}</td>
                  <td>{parcel.senderName}</td>
                  <td>{parcel.receiverName}</td>
                  <td>{parcel.receiverContact}</td>
                  <td>{parcel.receiverDistrict}</td>
                  <td>৳ {parcel.cost}</td>
                  <td>
                    <span className="badge badge-success">Paid</span>
                  </td>
                  <td>
                    <span className="badge badge-warning">Not Collected</span>
                  </td>
                  <td>
                    <button
                      className="btn btn-xs btn-primary"
                      onClick={() => openAssignModal(parcel)}
                    >
                      Assign Rider
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center text-gray-400 py-6">
                  No parcels ready for assignment
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🧑‍✈️ Riders Modal */}
      {selectedParcel && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-lg mb-2">
              Assign Rider – {selectedParcel.tracking_id}
            </h3>

            <p className="text-sm mb-4">
              District: <b>{selectedParcel.receiverDistrict}</b>
            </p>

            {loadingRiders ? (
              <p>Loading riders...</p>
            ) : riders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Bike</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {riders.map((rider) => (
                      <tr key={rider._id}>
                        <td>{rider.name}</td>
                        <td>{rider.phoneNumber || "N/A"}</td>
                        <td>{rider.bike}</td>
                        <td>
                          <button
                            className="btn btn-xs btn-success"
                            onClick={() =>
                              assignRider({
                                parcelId: selectedParcel._id,
                                rider: rider,
                              })
                            }
                          >
                            Select
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-400">
                No riders available in this district
              </p>
            )}

            <div className="modal-action">
              <button className="btn" onClick={() => setSelectedParcel(null)}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default AssignRider;
