import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const ActiveRiders = () => {
  const axiosSecure = UseAxiosSecure();

  const [search, setSearch] = useState("");
  const [activeRiders, setActiveRiders] = useState([]);

  //  Load active riders
  const {
    data: riders = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["active-riders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/active");
      return res.data;
    },
  });

  //  Sync React Query data → useState
  useEffect(() => {
    setActiveRiders(riders);
  }, [riders]);

  //  Client-side search on state
  const filteredRiders = activeRiders.filter((rider) => {
    const key = search.toLowerCase();
    return (
      rider.name?.toLowerCase().includes(key) ||
      rider.phone?.toLowerCase().includes(key)
    );
  });

  //  Deactivate rider
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

      Swal.fire("Success", "Rider deactivated", "success");

      // update UI immediately (state)
      setActiveRiders((prev) => prev.filter((rider) => rider._id !== id));

      // optional: sync with server again
      refetch();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Could not deactivate rider", "error");
    }
  };

  if (isPending) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Active Riders</h2>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or phone"
          className="input input-bordered w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
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
            {filteredRiders.length > 0 ? (
              filteredRiders.map((rider, index) => (
                <tr key={rider._id}>
                  <td>{index + 1}</td>
                  <td>{rider.name}</td>
                  <td>{rider.phone || "N/A"}</td>
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
                <td colSpan="9" className="text-center text-gray-400 py-6">
                  No active riders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveRiders;
