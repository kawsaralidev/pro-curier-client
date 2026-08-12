import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import UseAuth from "../../../hooks/useAuth";
import UseTrackingLogger from "../../../hooks/useTrackingLogger";

const PAGE_SIZE = 10;

const normalizeResponse = (response) => {
  if (Array.isArray(response)) {
    return {
      data: response,
      pagination: {
        total: response.length,
        page: 1,
        limit: response.length || PAGE_SIZE,
        totalPages: response.length ? 1 : 0,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
  }

  return {
    data: Array.isArray(response?.data) ? response.data : [],
    pagination: response?.pagination || {
      total: 0,
      page: 1,
      limit: PAGE_SIZE,
      totalPages: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    },
  };
};

const PendingDeliveries = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();
  const queryClient = useQueryClient();
  const { logTracking } = UseTrackingLogger();

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data: result = normalizeResponse([]), isLoading, isFetching } = useQuery({
    queryKey: ["riderTasks", page, search],
    enabled: Boolean(user),
    keepPreviousData: true,
    queryFn: async () => {
      const res = await axiosSecure.get("/rider/parcels", {
        params: { page, limit: PAGE_SIZE, search },
      });
      return normalizeResponse(res.data);
    },
  });

  const parcels = result.data;
  const pagination = result.pagination;

  const { mutateAsync: updateStatus, isPending: isUpdating } = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosSecure.patch(`/parcels/${id}/status`, { status });
      return res.data;
    },

    onSuccess: async (_, variables) => {
      const { parcel, status } = variables;

      await queryClient.invalidateQueries({ queryKey: ["riderTasks"] });

      Swal.fire({
        title: "Success",
        text: "Delivery status updated.",
        icon: "success",
        timer: 1300,
        showConfirmButton: false,
      });

      let details = `Picked up by ${user.displayName || user.email}`;
      if (status === "delivered") {
        details = `Delivered by ${user.displayName || user.email}`;
      }

      await logTracking({
        tracking_id: parcel.tracking_id,
        status,
        details,
        updated_by: user.email,
      });
    },

    onError: () => {
      Swal.fire("Error", "Failed to update delivery status.", "error");
    },
  });

  const handleSearch = (event) => {
    event.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  };

  const handleAction = async (parcel) => {
    let newStatus = "";

    if (parcel.delivery_status === "rider_assigned") {
      newStatus = "in_transit";
    } else if (parcel.delivery_status === "in_transit") {
      newStatus = "delivered";
    }

    if (!newStatus) return;

    await updateStatus({
      id: parcel._id,
      status: newStatus,
      parcel,
    });
  };

  if (isLoading) {
    return <p className="mt-10 text-center">Loading pending deliveries...</p>;
  }

  return (
    <div className="w-full">
      <div className="mb-6 flex flex-col gap-1">
        <h2 className="text-2xl font-bold sm:text-3xl">Pending Deliveries</h2>
        <p className="text-sm opacity-60">
          Manage parcels assigned to you and update their delivery progress.
        </p>
      </div>

      <form
        onSubmit={handleSearch}
        className="mb-5 flex flex-col gap-3 sm:flex-row"
      >
        <input
          type="search"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          placeholder="Search by tracking ID, parcel, sender or receiver"
          className="input input-bordered w-full sm:max-w-md"
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
        {search && (
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              setSearchInput("");
              setSearch("");
              setPage(1);
            }}
          >
            Clear
          </button>
        )}
      </form>

      <div className="overflow-x-auto rounded-xl bg-base-100 shadow">
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
                  <td>{(page - 1) * PAGE_SIZE + index + 1}</td>
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
                        disabled={isUpdating}
                        onClick={() => handleAction(parcel)}
                      >
                        Pick Up
                      </button>
                    )}
                    {parcel.delivery_status === "in_transit" && (
                      <button
                        className="btn btn-xs btn-success"
                        disabled={isUpdating}
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
                <td colSpan="8" className="py-8 text-center text-gray-400">
                  {search ? "No matching deliveries found." : "No pending deliveries."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {pagination.totalPages > 0 && (
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm opacity-60">
            Showing page {pagination.page} of {pagination.totalPages} ·{" "}
            {pagination.total} total
          </p>
          <div className="join">
            <button
              className="btn btn-sm join-item"
              disabled={!pagination.hasPreviousPage || isFetching}
              onClick={() => setPage((current) => Math.max(current - 1, 1))}
            >
              Previous
            </button>
            <button className="btn btn-sm join-item btn-ghost" disabled>
              {pagination.page}
            </button>
            <button
              className="btn btn-sm join-item"
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

export default PendingDeliveries;
