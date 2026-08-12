import authImg from "../assets/imgs/authImage.png";
import { Outlet } from "react-router";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import Footer from "../Pages/Shared/Footer/Footer";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="relative overflow-hidden bg-slate-50 py-10 sm:py-14 lg:py-20">
        <div className="pointer-events-none absolute left-0 top-0 h-80 w-80 rounded-full bg-teal-50 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-amber-50 blur-3xl" />

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div className="hidden lg:block">
            <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 p-8 shadow-[0_25px_70px_rgba(15,23,42,.16)] xl:p-10">
              <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-teal-600/20 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-amber-400/10 blur-3xl" />

              <div className="relative z-10">
                <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-teal-300">
                  ProCurier account
                </span>

                <h1 className="mt-6 max-w-lg text-4xl font-extrabold leading-tight tracking-tight text-white xl:text-5xl">
                  Your parcels.
                  <br />
                  Your journey.
                  <br />
                  <span className="text-amber-400">One platform.</span>
                </h1>

                <p className="mt-5 max-w-lg text-sm leading-7 text-slate-300 xl:text-base">
                  Manage shipments, track deliveries, and stay connected with
                  the complete ProCurier delivery workflow.
                </p>

                <img
                  src={authImg}
                  alt="ProCurier delivery illustration"
                  className="relative z-10 mt-8 w-full rounded-2xl object-contain"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-xl">
              <Outlet />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AuthLayout;
