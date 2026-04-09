import React, { useState } from "react";
import { useForm } from "react-hook-form";
import UseAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";
import axios from "axios";
import UseAxios from "../../hooks/useAxios";

const Register = () => {
  const { createUser, updateUserProfile } = UseAuth();
  const axiosInstance = UseAxios();
  const [profilePic, setProfilePic] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleImageUoload = async (e) => {
    const image = e.target.files[0];
    console.log(image);
    const formData = new FormData();
    formData.append("image", image);
    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_api_key}`;

    const res = await axios.post(imageUploadUrl, formData);
    setProfilePic(res.data.data.url);
  };

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then(async (result) => {
        console.log(result.user);
        // update user info in the database
        const userInfo = {
          email: data.email,
          role: "user", //default role
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
        };
        const userResponse = await axiosInstance.post("/users", userInfo);
        console.log(userResponse);
        // update user profile in firebase
        const userProfile = {
          displayName: data.name,
          photoUrl: profilePic,
        };
        updateUserProfile(userProfile)
          .then(() => {
            console.log("Profile name & pic updated");
            navigate(from);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-3xl font-bold">Create new account !</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            <label className="label">Your Name</label>
            <input
              type="text"
              {...register("name")}
              className="input"
              placeholder="Your Name"
            />
            {/* Error Messages */}
            {errors.email?.type === "required" && (
              <p className="text-red-500 text-sm">Name is required</p>
            )}
            {/* Profile picture  */}
            <label className="label">Your Picture</label>
            <input
              type="file"
              onChange={handleImageUoload}
              className="input"
              placeholder="Your Profile Picture"
            />

            {/* email field */}
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email")}
              className="input"
              placeholder="Email"
            />
            {/* Error Messages */}
            {errors.email?.type === "required" && (
              <p className="text-red-500 text-sm">Email is required</p>
            )}

            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
              })}
              className="input"
              placeholder="Password"
            />
            {/* Error Messages */}
            {errors.password?.type === "required" && (
              <p className="text-red-500 text-sm">Password is required</p>
            )}

            {errors.password?.type === "minLength" && (
              <p className="text-red-500 text-sm">
                Password must be at least 6 characters
              </p>
            )}

            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-error mt-4">Register</button>
          </fieldset>
          <p>
            <small>Already have an account?</small>
            <Link className="btn btn-link" to="/login">
              Login
            </Link>
          </p>
          <SocialLogin></SocialLogin>
        </form>
      </div>
    </div>
  );
};

export default Register;
