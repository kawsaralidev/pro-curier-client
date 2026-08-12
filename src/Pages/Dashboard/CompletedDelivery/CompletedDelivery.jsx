import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import UseAuth from "../../../hooks/useAuth";

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

const CompletedDeliveries = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();
  const queryClient = useQueryClient();

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data: result = normalizeResponse([]), isLoading, isFetching } = useQuery({
    queryKey: ["completedDeliveries", page, search],
    enabled: Boolean(user),
    keepPreviousData: true,
    queryFn: async () => {
      const res = await axiosSecure.get("/rider/completed-parcels", {
        params: {
          page,
          limit: PAGE_SIZE,
          search,
        },
      });
      return normalizeResponse(res.data);
    },
  });

  const parcels = result.data;
  const pagination = result.pagination;

  const calculateEarning = (parcel) => {
    const sameDistrict = parcel.senderDistrict === parcel.receiverDistrict;
    return sameDistrict ? parcel.cost * 0.8 : parcel.cost * 0.3;
  };

  const { mutateAsync: cashout, isPending: isCashingOut } = useMutation({
    mutationFn: async (parcelId) => {
      const res = await axiosSecure.patch(`/parcels/${parcelId}/cashout`);
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["completedDeliveries"] });
      Swal.fire({
        title: "Success",
        text: "Cashout completed.",
        icon: "success",
        timer: 1300,
        showConfirmButton: false,
      });
    },
    onError: () => {
      Swal.fire("Error", "Cashout failed.", "error");
    },
  });

  const handleSearch = (event) => {
    event.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  };

  if (isLoading) return <p className="mt-10 text-center">Loading completed deliveries...</p>;

  const currentPageEarning = parcels.reduce(
    (total, parcel) =>
      total +
      (parcel.cashout_status === "paid" ? 0 : calculateEarning(parcel)),
    0,
  );

  return (
    <div className="w-full">
      <div className="mb-6 flex flex-col gap-1">
        <h2 className="text-2xl font-bold sm:text-3xl">Completed Deliveries</h2>
        <p className="text-sm opacity-60">
          Review completed parcels and manage available cashouts.
        </p>
      </div>

      <div className="mb-5 rounded-xl bg-success/10 p-4">
        <p className="text-sm opacity-60">Available earnings on this page</p>
        <h3 className="text-xl font-bold text-success">
          ৳ {currentPageEarning.toFixed(2)}
        </h3>
      </div>

      <form
        onSubmit={handleSearch}
        className="mb-5 flex flex-col gap-3 sm:flex-row"
      >
        <input
          type="search"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          placeholder="Search by tracking ID, parcel or sender"
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
              <th>Sender Email</th>
              <th>Parcel</th>
              <th>Cost</th>
              <th>Earning</th>
              <th>Status</th>
              <th>Cashout</th>
            </tr>
          </thead>

          <tbody>
            {parcels.length > 0 ? (
              parcels.map((parcel, index) => {
                const earning = calculateEarning(parcel);

                return (
                  <tr key={parcel._id}>
                    <td>{(page - 1) * PAGE_SIZE + index + 1}</td>
                    <td className="font-mono text-xs">{parcel.tracking_id}</td>
                    <td>{parcel.senderEmail}</td>
                    <td>{parcel.parcelName}</td>
                    <td>৳ {parcel.cost}</td>
                    <td className="font-semibold text-success">
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
                          disabled={isCashingOut}
                          onClick={() => cashout(parcel._id)}
                        >
                          Cashout
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8" className="py-8 text-center text-gray-400">
                  {search ? "No matching completed deliveries found." : "No completed deliveries."}
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

export default CompletedDeliveries;
