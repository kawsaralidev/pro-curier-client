import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";
import UseAuth from "../../hooks/useAuth";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signIn } = UseAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const [loginError, setLoginError] = useState("");
  const [demoLoading, setDemoLoading] = useState("");

  const requestedPath = location.state?.from;

  const from =
    requestedPath && requestedPath !== "/forbiden"
      ? requestedPath
      : "/dashboard";

  // Demo accounts
  const demoAccounts = [
    {
      role: "User",
      email: "roni@gmail.com",
      password: "123456",
    },
    {
      role: "Rider",
      email: "rana@gmail.com",
      password: "123456",
    },
    {
      role: "Admin",
      email: "abc@gmail.com",
      password: "123456",
    },
  ];

  // Common login function
  const handleLogin = async (email, password, isDemo = false) => {
    setLoginError("");

    if (isDemo) {
      setDemoLoading(email);
    }

    try {
      await signIn(email, password);

      // Demo accounts always go to dashboard
      if (isDemo) {
        navigate("/dashboard", {
          replace: true,
        });

        return;
      }

      // Normal login
      navigate(from, {
        replace: true,
      });
    } catch (error) {
      console.error("Login failed:", error);

      setLoginError(
        isDemo
          ? "Demo account could not be signed in. Please check that the demo account exists in Firebase."
          : "Invalid email or password. Please try again.",
      );
    } finally {
      if (isDemo) {
        setDemoLoading("");
      }
    }
  };

  // Normal login
  const onSubmit = (data) => {
    handleLogin(data.email, data.password);
  };

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,.09)] sm:p-8 lg:p-10">
      {/* Header */}
      <div className="mb-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-3.5 py-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-teal-700">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
          Welcome back
        </span>

        <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
          Sign in to ProCurier
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Access your parcels, delivery activity, and personalized dashboard.
        </p>
      </div>

      {/* Demo Login */}
      <div className="mb-7">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-sm font-extrabold text-slate-900">
              Explore ProCurier
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Choose a role to instantly access the demo.
            </p>
          </div>

          <span className="rounded-full bg-teal-50 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wider text-teal-700">
            1-click
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {/* User */}
          <button
            type="button"
            disabled={Boolean(demoLoading)}
            onClick={() =>
              handleLogin(demoAccounts[0].email, demoAccounts[0].password, true)
            }
            className="group flex h-12 items-center justify-center gap-2 rounded-xl border border-teal-200 bg-teal-50 px-4 text-sm font-extrabold text-teal-800 transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-400 hover:bg-teal-100 hover:shadow-md hover:shadow-teal-700/10 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {demoLoading === demoAccounts[0].email ? (
              <span className="loading loading-spinner loading-xs" />
            ) : null}
            Continue as User
          </button>

          {/* Rider */}
          <button
            type="button"
            disabled={Boolean(demoLoading)}
            onClick={() =>
              handleLogin(demoAccounts[1].email, demoAccounts[1].password, true)
            }
            className="group flex h-12 items-center justify-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 text-sm font-extrabold text-amber-800 transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-400 hover:bg-amber-100 hover:shadow-md hover:shadow-amber-500/10 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {demoLoading === demoAccounts[1].email ? (
              <span className="loading loading-spinner loading-xs" />
            ) : null}
            Continue as Rider
          </button>

          {/* Admin */}
          <button
            type="button"
            disabled={Boolean(demoLoading)}
            onClick={() =>
              handleLogin(demoAccounts[2].email, demoAccounts[2].password, true)
            }
            className="group flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-slate-100 px-4 text-sm font-extrabold text-slate-800 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-500 hover:bg-slate-200 hover:shadow-md hover:shadow-slate-900/10 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {demoLoading === demoAccounts[2].email ? (
              <span className="loading loading-spinner loading-xs" />
            ) : null}
            Continue as Admin
          </button>
        </div>
      </div>

      {/* Login Error */}
      {loginError && (
        <div className="mb-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-xs font-semibold leading-5 text-red-600">
          {loginError}
        </div>
      )}

      {/* Normal Login Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email */}
        <div>
          <label
            htmlFor="login-email"
            className="mb-2 block text-sm font-bold text-slate-800"
          >
            Email address
          </label>

          <input
            id="login-email"
            type="email"
            {...register("email", {
              required: true,
            })}
            className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
            placeholder="you@example.com"
          />

          {errors.email && (
            <p className="mt-2 text-xs font-semibold text-red-500">
              Email is required
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="login-password"
              className="text-sm font-bold text-slate-800"
            >
              Password
            </label>

            <button
              type="button"
              className="text-xs font-bold text-teal-700 hover:text-teal-800"
            >
              Forgot password?
            </button>
          </div>

          <input
            id="login-password"
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
            })}
            className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
            placeholder="Enter your password"
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
          className="h-12 w-full rounded-xl border-0 bg-teal-700 font-extrabold text-white shadow-lg shadow-teal-700/15 transition hover:bg-teal-800 hover:shadow-teal-700/25"
        >
          Sign in to your account
        </button>
      </form>

      {/* Divider */}
      <div className="my-7 flex items-center gap-3">
        <span className="h-px flex-1 bg-slate-200" />

        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
          or continue with
        </span>

        <span className="h-px flex-1 bg-slate-200" />
      </div>

      {/* Social Login */}
      <SocialLogin />

      {/* Register */}
      <p className="mt-7 text-center text-sm text-slate-500">
        New to ProCurier?{" "}
        <Link
          state={{ from }}
          className="font-extrabold text-teal-700 hover:text-teal-800"
          to="/register"
        >
          Create an account
        </Link>
      </p>
    </section>
  );
};

export default Login;
