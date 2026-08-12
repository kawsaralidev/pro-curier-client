import logo from "../../../assets/logos/procurier-mark.svg";
import { Link } from "react-router";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaArrowUp,
} from "react-icons/fa";

const socialLinks = [
  { label: "Facebook", icon: FaFacebookF },
  { label: "Instagram", icon: FaInstagram },
  { label: "LinkedIn", icon: FaLinkedinIn },
];

const Footer = () => (
  <footer className="relative overflow-hidden bg-slate-950 text-slate-300">
    <div className="pointer-events-none absolute -left-32 -top-32 h-72 w-72 rounded-full bg-teal-700/15 blur-3xl" />
    <div className="pointer-events-none absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl" />

    <div className="pc-container relative">
      <div className="grid gap-12 border-b border-white/10 py-14 sm:py-16 lg:grid-cols-[1.5fr_1fr_1fr_1.1fr] lg:gap-10">
        <div>
          <Link to="/" className="inline-flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 ring-1 ring-white/10">
              <img
                src={logo}
                alt="ProCurier logo"
                className="h-9 w-9 object-contain"
              />
            </span>
            <span className="text-2xl font-extrabold tracking-tight text-white">
              Pro<span className="text-teal-400">Curier</span>
            </span>
          </Link>

          <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
            Reliable parcel delivery with transparent tracking, organized
            workflows, and a better experience for every role.
          </p>

          <div className="mt-6 flex gap-2">
            {socialLinks.map((social) => {
              const Icon = social.icon;

              return (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-sm text-slate-400 transition hover:border-teal-400/30 hover:bg-teal-600 hover:text-white"
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-[0.14em] text-white">
            Platform
          </h3>
          <div className="mt-5 flex flex-col gap-3 text-sm">
            <Link className="transition hover:text-teal-300" to="/">Home</Link>
            <Link className="transition hover:text-teal-300" to="/sendParcel">Send a Parcel</Link>
            <Link className="transition hover:text-teal-300" to="/coverage">Coverage</Link>
            <Link className="transition hover:text-teal-300" to="/beARider">Become a Rider</Link>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-[0.14em] text-white">
            Account
          </h3>
          <div className="mt-5 flex flex-col gap-3 text-sm">
            <Link className="transition hover:text-teal-300" to="/login">Login</Link>
            <Link className="transition hover:text-teal-300" to="/register">Register</Link>
            <Link className="transition hover:text-teal-300" to="/dashboard">Dashboard</Link>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-[0.14em] text-white">
            ProCurier promise
          </h3>
          <p className="mt-5 text-sm leading-7 text-slate-400">
            Clear tracking, structured delivery operations, and role-based
            access designed around the complete parcel journey.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full border border-teal-400/20 bg-teal-400/10 px-3 py-1.5 text-xs font-bold text-teal-300">
              Live Tracking
            </span>
            <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1.5 text-xs font-bold text-amber-300">
              Secure Workflow
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} ProCurier. All rights reserved.</p>

        <div className="flex items-center gap-5">
          <span>Fast delivery. Clear tracking. Better control.</span>
          <Link
            to="/"
            aria-label="Back to top"
            className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-slate-400 transition hover:border-teal-400/30 hover:text-teal-300"
          >
            <FaArrowUp />
          </Link>
        </div>
      </div>
    </div>
  </footer>
);
export default Footer;
