import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaSearch, FaUserShield, FaUserTimes } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MakeAdmin = () => {
  const axiosSecure = useAxiosSecure();

  const [emailQuery, setEmailQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  // 🔍 Search users by email (manual trigger)
  const {
    data: users = [],
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["searchedUsers", emailQuery],
    enabled: false,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/search?email=${emailQuery}`);
      return res.data;
    },
  });

  // 🔍 Trigger search
  const handleSearch = () => {
    if (!emailQuery) return;
    setHasSearched(true);
    refetch();
  };

  // 👑 Make / Remove admin
  const handleRoleChange = async (user, role) => {
    const confirm = await Swal.fire({
      title: role === "admin" ? "Make this user admin?" : "Remove admin role?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.patch(`/users/${user._id}/role`, {
        role,
      });

      Swal.fire("Success", `User is now ${role}`, "success");

      refetch();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update role", "error");
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Make Admin</h2>

      {/* 🔍 Search box */}
      <div className="flex gap-2 mb-6 max-w-md">
        <input
          type="email"
          placeholder="Search user by email"
          className="input input-bordered w-full"
          value={emailQuery}
          onChange={(e) => setEmailQuery(e.target.value)}
        />
        <button onClick={handleSearch} className="btn btn-primary">
          <FaSearch />
        </button>
      </div>

      {/* 🔄 Searching */}
      {isFetching && <p className="text-gray-400">Searching...</p>}

      {/* 📊 Search result table */}
      {!isFetching && users.length > 0 && (
        <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Role</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.email}</td>
                  <td>
                    <span
                      className={`badge ${
                        user.role === "admin" ? "badge-success" : "badge-ghost"
                      }`}
                    >
                      {user.role || "user"}
                    </span>
                  </td>
                  <td>
                    {user.created_at
                      ? new Date(user.created_at).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td>
                    {user.role === "admin" ? (
                      <button
                        className="btn btn-xs btn-error"
                        onClick={() => handleRoleChange(user, "user")}
                      >
                        <FaUserTimes /> Remove
                      </button>
                    ) : (
                      <button
                        className="btn btn-xs btn-success"
                        onClick={() => handleRoleChange(user, "admin")}
                      >
                        <FaUserShield /> Make Admin
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ❌ No users found */}
      {!isFetching && hasSearched && users.length === 0 && (
        <p className="text-red-500 font-medium">No users found</p>
      )}

      {/* ℹ️ Initial state */}
      {!hasSearched && <p className="text-gray-400">Search to find users</p>}
    </div>
  );
};

export default MakeAdmin;
