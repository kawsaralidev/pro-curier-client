import { useState } from "react";
import { useForm } from "react-hook-form";
import UseAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";
import axios from "axios";
import UseAxios from "../../hooks/useAxios";

const Register = () => {
  const { createUser, updateUserProfile } = UseAuth();
  const axiosInstance = UseAxios();

  const [profilePic, setProfilePic] = useState("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Upload profile image
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];

    if (!image) return;

    try {
      const formData = new FormData();
      formData.append("image", image);

      const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_api_key}`;

      const res = await axios.post(imageUploadUrl, formData);

      setProfilePic(res.data.data.url);
    } catch (error) {
      console.error("Profile image upload failed:", error);
    }
  };

  // Register user
  const onSubmit = async (data) => {
    try {
      // Create Firebase account
      const result = await createUser(data.email, data.password);

      console.log("Firebase user created:", result.user);

      // Create user in backend
      const userInfo = {
        email: data.email,
        role: "user",
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };

      const userResponse = await axiosInstance.post("/users", userInfo);

      console.log("Backend user created:", userResponse.data);

      // Update Firebase profile
      const userProfile = {
        displayName: data.name,
        photoUrl: profilePic,
      };

      await updateUserProfile(userProfile);

      console.log("Profile name & picture updated");

      // Registration successful → Dashboard
      navigate("/dashboard", {
        replace: true,
      });
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,.09)] sm:p-8 lg:p-10">
      {/* Header */}
      <div className="mb-7">
        <span className="inline-flex items-center gap-2 rounded-full border border-amber-100 bg-amber-50 px-3.5 py-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-amber-700">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-600" />
          Get started
        </span>

        <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
          Create your account
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Join ProCurier and manage your delivery journey from one place.
        </p>
      </div>

      {/* Registration Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name */}
        <div>
          <label
            htmlFor="register-name"
            className="mb-2 block text-sm font-bold text-slate-800"
          >
            Full name
          </label>

          <input
            id="register-name"
            type="text"
            {...register("name", {
              required: true,
            })}
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
            placeholder="Your full name"
          />

          {errors.name && (
            <p className="mt-2 text-xs font-semibold text-red-500">
              Name is required
            </p>
          )}
        </div>

        {/* Profile Picture */}
        <div>
          <label
            htmlFor="register-picture"
            className="mb-2 block text-sm font-bold text-slate-800"
          >
            Profile picture
          </label>

          <input
            id="register-picture"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="file-input file-input-bordered h-11 w-full rounded-xl border-slate-200 bg-slate-50 text-sm"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="register-email"
            className="mb-2 block text-sm font-bold text-slate-800"
          >
            Email address
          </label>

          <input
            id="register-email"
            type="email"
            {...register("email", {
              required: true,
            })}
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
            placeholder="you@example.com"
          />

          {errors.email?.type === "required" && (
            <p className="mt-2 text-xs font-semibold text-red-500">
              Email is required
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="register-password"
            className="mb-2 block text-sm font-bold text-slate-800"
          >
            Password
          </label>

          <input
            id="register-password"
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
            })}
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
            placeholder="At least 6 characters"
          />

          {errors.password?.type === "required" && (
            <p className="mt-2 text-xs font-semibold text-red-500">
              Password is required
            </p>
          )}

          {errors.password?.type === "minLength" && (
            <p className="mt-2 text-xs font-semibold text-red-500">
              Password must be at least 6 characters
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-2 h-12 w-full rounded-xl border-0 bg-teal-700 font-extrabold text-white shadow-lg shadow-teal-700/15 transition hover:bg-teal-800"
        >
          Create ProCurier account
        </button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center gap-3">
        <span className="h-px flex-1 bg-slate-200" />

        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
          or continue with
        </span>

        <span className="h-px flex-1 bg-slate-200" />
      </div>

      {/* Social Login */}
      <SocialLogin />

      {/* Login Link */}
      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link
          className="font-extrabold text-teal-700 hover:text-teal-800"
          to="/login"
        >
          Sign in
        </Link>
      </p>
    </section>
  );
};

export default Register;
