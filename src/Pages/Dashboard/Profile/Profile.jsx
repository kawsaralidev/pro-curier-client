import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FaCamera, FaSave, FaUserCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import UseAuth from "../../../hooks/useAuth";
import Loading from "../../../Components/Loading";

const Profile = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();

  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  const {
    data: profile,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["my-profile"],
    enabled: Boolean(user),
    queryFn: async () => {
      const response = await axiosSecure.get("/users/me");
      return response.data;
    },
  });

  if (isLoading) return <Loading />;

  if (isError || !profile) {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <div className="alert alert-error">
          <span>Unable to load your profile.</span>
        </div>
      </div>
    );
  }

  const values = form || {
    name: profile.name || profile.displayName || user?.displayName || "",
    displayName: profile.displayName || profile.name || user?.displayName || "",
    photoUrl:
      profile.photoUrl ||
      profile.photoURL ||
      user?.photoURL ||
      "",
    phone: profile.phone || "",
    address: profile.address || "",
  };

  const updateField = (field, value) => {
    setForm((current) => ({
      ...(current || values),
      [field]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);

    try {
      const response = await axiosSecure.patch("/users/me", values);

      queryClient.setQueryData(["my-profile"], response.data.user);
      await queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });

      setForm(response.data.user);

      await Swal.fire({
        title: "Profile updated",
        text: "Your profile information has been updated successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      await Swal.fire({
        title: "Update failed",
        text:
          error.response?.data?.message ||
          "Could not update your profile. Please try again.",
        icon: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  const photo =
    values.photoUrl || values.photoURL || user?.photoURL || "";

  return (
    <div className="mx-auto w-full max-w-5xl px-3 py-5 sm:px-5 lg:px-6">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          Account
        </p>
        <h1 className="mt-1 text-2xl font-bold sm:text-3xl">My Profile</h1>
        <p className="mt-1 text-sm opacity-65">
          Manage the personal information connected to your ProCurier account.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="card border border-base-300 bg-base-100 shadow-sm">
          <div className="card-body items-center text-center">
            <div className="relative">
              {photo ? (
                <img
                  src={photo}
                  alt={values.name || "Profile"}
                  className="h-28 w-28 rounded-full object-cover ring-4 ring-primary/10"
                />
              ) : (
                <FaUserCircle className="h-28 w-28 opacity-30" />
              )}
              <span className="absolute bottom-1 right-1 grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-content shadow">
                <FaCamera />
              </span>
            </div>

            <h2 className="mt-4 text-xl font-bold">
              {values.name || "ProCurier User"}
            </h2>
            <p className="break-all text-sm opacity-60">{profile.email}</p>
            <span className="badge badge-primary mt-2 capitalize">
              {profile.role || "user"}
            </span>
          </div>
        </aside>

        <form
          onSubmit={handleSubmit}
          className="card border border-base-300 bg-base-100 shadow-sm"
        >
          <div className="card-body">
            <h2 className="card-title">Profile Information</h2>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="form-control">
                <span className="label-text mb-2 font-medium">Name</span>
                <input
                  className="input input-bordered w-full"
                  value={values.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  placeholder="Your name"
                />
              </label>

              <label className="form-control">
                <span className="label-text mb-2 font-medium">
                  Display Name
                </span>
                <input
                  className="input input-bordered w-full"
                  value={values.displayName}
                  onChange={(event) =>
                    updateField("displayName", event.target.value)
                  }
                  placeholder="Display name"
                />
              </label>

              <label className="form-control">
                <span className="label-text mb-2 font-medium">Email</span>
                <input
                  className="input input-bordered w-full bg-base-200"
                  value={profile.email || ""}
                  readOnly
                />
              </label>

              <label className="form-control">
                <span className="label-text mb-2 font-medium">Phone</span>
                <input
                  className="input input-bordered w-full"
                  value={values.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  placeholder="Phone number"
                />
              </label>

              <label className="form-control sm:col-span-2">
                <span className="label-text mb-2 font-medium">
                  Profile Photo URL
                </span>
                <input
                  className="input input-bordered w-full"
                  value={values.photoUrl}
                  onChange={(event) =>
                    updateField("photoUrl", event.target.value)
                  }
                  placeholder="https://..."
                />
              </label>

              <label className="form-control sm:col-span-2">
                <span className="label-text mb-2 font-medium">Address</span>
                <textarea
                  className="textarea textarea-bordered min-h-28 w-full"
                  value={values.address}
                  onChange={(event) =>
                    updateField("address", event.target.value)
                  }
                  placeholder="Your address"
                />
              </label>
            </div>

            <div className="card-actions mt-4 justify-end">
              <button
                type="submit"
                disabled={saving}
                className="btn btn-primary min-w-36"
              >
                {saving ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  <FaSave />
                )}
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
