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

const ActiveRiders = () => {
  const axiosSecure = UseAxiosSecure();

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const {
    data: result = normalizeResponse([]),
    isPending,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["active-riders", page, search],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/active", {
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

  const handleDeactivate = async (id) => {
    const confirm = await Swal.fire({
      title: "Deactivate this rider?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.patch(`/riders/${id}/status`, {
        status: "inactive",
      });

      await refetch();

      Swal.fire({
        title: "Success",
        text: "Rider deactivated.",
        icon: "success",
        timer: 1300,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Could not deactivate rider.", "error");
    }
  };

  if (isPending) {
    return <p className="mt-10 text-center">Loading active riders...</p>;
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold sm:text-3xl">Active Riders</h2>
        <p className="mt-1 text-sm opacity-60">
          Search and manage approved riders.
        </p>
      </div>

      <form
        onSubmit={handleSearch}
        className="mb-5 flex flex-col gap-3 sm:flex-row"
      >
        <input
          type="search"
          placeholder="Search by name, phone, email or district"
          className="input input-bordered w-full sm:max-w-md"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
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
              <th>Phone</th>
              <th>Email</th>
              <th>Region</th>
              <th>District</th>
              <th>Bike</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {riders.length > 0 ? (
              riders.map((rider, index) => (
                <tr key={rider._id}>
                  <td>{(page - 1) * PAGE_SIZE + index + 1}</td>
                  <td>{rider.name}</td>
                  <td>{rider.phone || rider.phoneNumber || "N/A"}</td>
                  <td>{rider.email}</td>
                  <td>{rider.region}</td>
                  <td>{rider.district}</td>
                  <td>{rider.bike}</td>
                  <td>
                    <span className="badge badge-success">Active</span>
                  </td>
                  <td>
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => handleDeactivate(rider._id)}
                    >
                      Deactivate
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="py-8 text-center text-gray-400">
                  {search ? "No matching active riders found." : "No active riders found."}
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

export default ActiveRiders;
