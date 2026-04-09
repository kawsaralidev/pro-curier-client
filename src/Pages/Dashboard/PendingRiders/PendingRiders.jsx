import { useState } from "react";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PendingRiders = () => {
  const axiosSecure = UseAxiosSecure();
  const [selectedRider, setSelectedRider] = useState(null);

  //  Load pending riders
  const {
    isPending,
    data: riders = [],
    refetch,
  } = useQuery({
    queryKey: ["pending-riders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/pending");
      return res.data;
    },
  });

  // Approve / Reject handler (ONE FUNCTION)
  const handleDecision = async (id, action, email) => {
    const confirm = await Swal.fire({
      title:
        action === "approve"
          ? "Approve this application?"
          : "Reject this application?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.patch(`/riders/${id}/status`, {
        status: action === "approve" ? "approved" : "rejected",
        email: email,
      });
      Swal.fire("Success", `Rider ${action}d successfully`, "success");
      refetch();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Could not update rider status", "error");
    }
  };

  if (isPending) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Pending Riders</h2>

      <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Region</th>
              <th>District</th>
              <th>Bike</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {riders.length > 0 ? (
              riders.map((rider, index) => (
                <tr key={rider._id}>
                  <td>{index + 1}</td>
                  <td>{rider.name}</td>
                  <td>{rider.email}</td>
                  <td>{rider.region}</td>
                  <td>{rider.district}</td>
                  <td>{rider.bike}</td>
                  <td>
                    {rider.createdAt
                      ? new Date(rider.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="space-x-2">
                    <button
                      className="btn btn-xs btn-info"
                      onClick={() => setSelectedRider(rider)}
                    >
                      View
                    </button>

                    <button
                      className="btn btn-xs btn-success"
                      onClick={() =>
                        handleDecision(rider._id, "approve", rider.email)
                      }
                    >
                      Approve
                    </button>

                    <button
                      className="btn btn-xs btn-error"
                      onClick={() =>
                        handleDecision(rider._id, "reject", rider.email)
                      }
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center text-gray-400 py-6">
                  No pending riders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🔹 Rider Details Modal */}
      {selectedRider && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Rider Details</h3>

            <div className="space-y-2 text-sm">
              <p>
                <b>Name:</b> {selectedRider.name}
              </p>
              <p>
                <b>Email:</b> {selectedRider.email}
              </p>
              <p>
                <b>Region:</b> {selectedRider.region}
              </p>
              <p>
                <b>District:</b> {selectedRider.district}
              </p>
              <p>
                <b>Bike:</b> {selectedRider.bike}
              </p>
              <p>
                <b>Status:</b> {selectedRider.status}
              </p>
            </div>

            <div className="modal-action">
              <button
                className="btn btn-success"
                onClick={() => handleDecision(selectedRider._id, "approve")}
              >
                Approve
              </button>

              <button
                className="btn btn-error"
                onClick={() => handleDecision(selectedRider._id, "reject")}
              >
                Reject
              </button>

              <button className="btn" onClick={() => setSelectedRider(null)}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default PendingRiders;
