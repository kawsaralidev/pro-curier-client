import Swal from "sweetalert2";
import UseAuth from "../../../hooks/useAuth";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";

const MyParcels = () => {
  const { user } = UseAuth();
  const navigate = useNavigate();
  const axiosSecure = UseAxiosSecure();
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["my-parcels", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      return res.data;
    },
  });
  //   console.log(parcels);
  // payment method
  const handlePay = (id) => {
    navigate(`/dashboard/payment/${id}`);
  };
  //   Delete method
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This parcel will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          if (res.data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Parcel has been deleted successfully.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
          }
          refetch();
        });
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to delete parcel.",
          icon: error,
        });
      }
    }
  };
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* Table Head */}
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Type</th>
            <th>Created At</th>
            <th>Cost (৳)</th>
            <th>Payment Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {parcels.map((parcel, index) => (
            <tr key={parcel._id}>
              <td>{index + 1}</td>
              <td>{parcel.parcelName}</td>

              {/* Type */}
              <td className="capitalize">
                {parcel.type === "document" ? (
                  <span className="badge badge-info">Document</span>
                ) : (
                  <span className="badge badge-warning">Non-Document</span>
                )}
              </td>

              {/* Created Date */}
              <td>{new Date(parcel.creation_date).toLocaleDateString()}</td>

              {/* Cost */}
              <td>{parcel.cost}</td>

              {/* Payment Status */}
              <td>
                {parcel.payment_status === "paid" ? (
                  <span className="badge badge-success">Paid</span>
                ) : (
                  <span className="badge badge-error">Unpaid</span>
                )}
              </td>

              {/* Actions */}
              <td className="flex gap-2">
                <button
                  className="btn btn-xs btn-outline btn-info"
                  //   onClick={() => onView(parcel)}
                >
                  View
                </button>

                {parcel.payment_status === "unpaid" && (
                  <button
                    className="btn btn-xs btn-outline btn-success"
                    onClick={() => handlePay(parcel._id)}
                  >
                    Pay
                  </button>
                )}

                <button
                  className="btn btn-xs btn-outline btn-error"
                  onClick={() => handleDelete(parcel._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {/* Empty State */}
          {parcels.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center text-gray-500">
                No parcels found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyParcels;
