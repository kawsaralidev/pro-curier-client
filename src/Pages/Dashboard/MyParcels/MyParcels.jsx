import Swal from "sweetalert2";
import UseAuth from "../../../hooks/useAuth";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useState } from "react";
import { FaCopy } from "react-icons/fa";

const MyParcels = () => {
  const { user } = UseAuth();
  const navigate = useNavigate();
  const axiosSecure = UseAxiosSecure();

  const [search, setSearch] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [deliveryStatus, setDeliveryStatus] = useState("");
  const [sortBy, setSortBy] = useState("creation_date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const limit = 10;

  const {
    data,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: [
      "my-parcels",
      user?.email,
      search,
      paymentStatus,
      deliveryStatus,
      sortBy,
      sortOrder,
      page,
    ],
    enabled: Boolean(user?.email),
    queryFn: async () => {
      const params = new URLSearchParams({
        email: user.email,
        page: String(page),
        limit: String(limit),
        sortBy,
        sortOrder,
      });

      if (search.trim()) params.set("search", search.trim());
      if (paymentStatus) params.set("payment_status", paymentStatus);
      if (deliveryStatus) params.set("delivery_status", deliveryStatus);

      const res = await axiosSecure.get(`/parcels?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });

      return res.data;
    },
  });

  const parcels = Array.isArray(data) ? data : data?.data || [];
  const pagination = data?.pagination;

  const handleFilterChange = (setter, value) => {
    setter(value);
    setPage(1);
  };

  const handleCopyTrackingId = async (trackingId) => {
    if (!trackingId) return;

    try {
      await navigator.clipboard.writeText(trackingId);
      await Swal.fire({
        title: "Copied!",
        text: "Tracking ID copied to clipboard.",
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
      });
    } catch {
      Swal.fire({
        title: "Could not copy",
        text: "Please copy the tracking ID manually.",
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  const handlePay = (id) => {
    navigate(`/dashboard/payment/${id}`);
  };

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

    if (!result.isConfirmed) return;

    try {
      const response = await axiosSecure.delete(`/parcels/${id}`);

      if (response.data.deletedCount) {
        await Swal.fire({
          title: "Deleted!",
          text: "Parcel has been deleted successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }

      if (parcels.length === 1 && page > 1) {
        setPage((current) => current - 1);
      } else {
        refetch();
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text:
          error.response?.data?.message || "Failed to delete parcel.",
        icon: "error",
      });
    }
  };

  const resetFilters = () => {
    setSearch("");
    setPaymentStatus("");
    setDeliveryStatus("");
    setSortBy("creation_date");
    setSortOrder("desc");
    setPage(1);
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">My Parcels</h1>
        <p className="mt-1 text-sm opacity-70">
          Search, filter and manage your parcels.
        </p>
      </div>

      <div className="rounded-xl border bg-base-100 p-4 shadow-sm">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
          <input
            type="search"
            value={search}
            onChange={(event) =>
              handleFilterChange(setSearch, event.target.value)
            }
            className="input input-bordered w-full lg:col-span-2"
            placeholder="Search tracking ID, name, district..."
          />

          <select
            value={paymentStatus}
            onChange={(event) =>
              handleFilterChange(setPaymentStatus, event.target.value)
            }
            className="select select-bordered w-full"
          >
            <option value="">All payment status</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>

          <select
            value={deliveryStatus}
            onChange={(event) =>
              handleFilterChange(setDeliveryStatus, event.target.value)
            }
            className="select select-bordered w-full"
          >
            <option value="">All delivery status</option>
            <option value="pending">Pending</option>
            <option value="picked-up">Picked Up</option>
            <option value="in-transit">In Transit</option>
            <option value="delivered">Delivered</option>
          </select>

          <button
            type="button"
            onClick={resetFilters}
            className="btn btn-outline"
          >
            Reset
          </button>
        </div>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <select
            value={sortBy}
            onChange={(event) => {
              setSortBy(event.target.value);
              setPage(1);
            }}
            className="select select-bordered w-full"
          >
            <option value="creation_date">Sort by created date</option>
            <option value="cost">Sort by cost</option>
            <option value="payment_status">Sort by payment status</option>
            <option value="delivery_status">Sort by delivery status</option>
            <option value="tracking_id">Sort by tracking ID</option>
          </select>

          <select
            value={sortOrder}
            onChange={(event) => {
              setSortOrder(event.target.value);
              setPage(1);
            }}
            className="select select-bordered w-full"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>

      <div className="relative overflow-x-auto rounded-xl border bg-base-100 shadow-sm">
        {isFetching && !isLoading && (
          <div className="absolute right-3 top-3 z-10">
            <span className="loading loading-spinner loading-sm" />
          </div>
        )}

        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Tracking ID</th>
              <th>Type</th>
              <th>Created At</th>
              <th>Cost (৳)</th>
              <th>Payment Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={`skeleton-${index}`}>
                  {Array.from({ length: 8 }).map((__, cellIndex) => (
                    <td key={cellIndex}>
                      <div className="skeleton h-5 w-full" />
                    </td>
                  ))}
                </tr>
              ))
            ) : parcels.length > 0 ? (
              parcels.map((parcel, index) => (
                <tr key={parcel._id}>
                  <td>{(page - 1) * limit + index + 1}</td>
                  <td>{parcel.parcelName || "N/A"}</td>

                  <td>
                    {parcel.tracking_id ? (
                      <div className="flex min-w-52 items-center gap-2">
                        <span className="font-mono text-xs">
                          {parcel.tracking_id}
                        </span>
                        <button
                          type="button"
                          className="btn btn-ghost btn-xs"
                          title="Copy tracking ID"
                          onClick={() =>
                            handleCopyTrackingId(parcel.tracking_id)
                          }
                        >
                          <FaCopy />
                        </button>
                      </div>
                    ) : (
                      "N/A"
                    )}
                  </td>

                  <td className="capitalize">
                    {parcel.type === "document" ? (
                      <span className="badge badge-info">Document</span>
                    ) : (
                      <span className="badge badge-warning">
                        Non-Document
                      </span>
                    )}
                  </td>

                  <td>
                    {parcel.creation_date
                      ? new Date(parcel.creation_date).toLocaleDateString()
                      : "N/A"}
                  </td>

                  <td>{parcel.cost ?? "N/A"}</td>

                  <td>
                    {parcel.payment_status === "paid" ? (
                      <span className="badge badge-success">Paid</span>
                    ) : (
                      <span className="badge badge-error">Unpaid</span>
                    )}
                  </td>

                  <td className="flex flex-wrap gap-2">
                    <button
                      className="btn btn-xs btn-outline btn-info"
                      onClick={() =>
                        navigate(`/dashboard/parcel-details/${parcel._id}`)
                      }
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
              ))
            ) : (
              <tr>
                <td colSpan="8" className="py-12 text-center">
                  <p className="font-medium">No parcels found</p>
                  <p className="mt-1 text-sm opacity-60">
                    Try another search or reset the filters.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {pagination && pagination.totalPages > 0 && (
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-sm opacity-70">
            Page {pagination.page} of {pagination.totalPages} •{" "}
            {pagination.total} parcels
          </p>

          <div className="join">
            <button
              className="btn join-item"
              disabled={!pagination.hasPreviousPage || isFetching}
              onClick={() => setPage((current) => current - 1)}
            >
              Previous
            </button>

            <button className="btn join-item btn-disabled">
              {pagination.page}
            </button>

            <button
              className="btn join-item"
              disabled={!pagination.hasNextPage || isFetching}
              onClick={() => setPage((current) => current + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyParcels;
