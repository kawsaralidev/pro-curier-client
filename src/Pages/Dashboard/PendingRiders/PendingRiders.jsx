import { useState } from "react";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

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

const PendingRiders = () => {
  const axiosSecure = UseAxiosSecure();
  const [selectedRider, setSelectedRider] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const {
    isPending,
    isFetching,
    data: result = normalizeResponse([]),
    refetch,
  } = useQuery({
    queryKey: ["pending-riders", page, search],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/pending", {
        params: { page, limit: PAGE_SIZE, search },
      });
      return normalizeResponse(res.data);
    },
  });

  const riders = result.data;
  const pagination = result.pagination;

  const handleSearch = (event) => {
    event.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  };

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
        email,
      });

      await refetch();

      Swal.fire({
        title: "Success",
        text: `Rider ${action}d successfully.`,
        icon: "success",
        timer: 1300,
        showConfirmButton: false,
      });

      setSelectedRider(null);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Could not update rider status.", "error");
    }
  };

  if (isPending) {
    return <p className="mt-10 text-center">Loading pending riders...</p>;
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold sm:text-3xl">Pending Riders</h2>
        <p className="mt-1 text-sm opacity-60">
          Review and approve rider applications.
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
          placeholder="Search by name, email, phone or district"
          className="input input-bordered w-full sm:max-w-md"
        />
        <button type="submit" className="btn btn-primary">Search</button>
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
                  <td>{(page - 1) * PAGE_SIZE + index + 1}</td>
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
                  <td>
                    <div className="flex flex-wrap gap-2">
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
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="py-8 text-center text-gray-400">
                  {search ? "No matching pending riders found." : "No pending riders found."}
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

      {selectedRider && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="mb-4 text-lg font-bold">Rider Details</h3>

            <div className="space-y-2 text-sm">
              <p><b>Name:</b> {selectedRider.name}</p>
              <p><b>Email:</b> {selectedRider.email}</p>
              <p><b>Region:</b> {selectedRider.region}</p>
              <p><b>District:</b> {selectedRider.district}</p>
              <p><b>Bike:</b> {selectedRider.bike}</p>
              <p><b>Status:</b> {selectedRider.status}</p>
            </div>

            <div className="modal-action flex-wrap">
              <button
                className="btn btn-success"
                onClick={() =>
                  handleDecision(
                    selectedRider._id,
                    "approve",
                    selectedRider.email,
                  )
                }
              >
                Approve
              </button>
              <button
                className="btn btn-error"
                onClick={() =>
                  handleDecision(
                    selectedRider._id,
                    "reject",
                    selectedRider.email,
                  )
                }
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
