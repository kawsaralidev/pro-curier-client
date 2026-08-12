import { Link } from "react-router";
import {
  FaUser,
  FaMotorcycle,
  FaUserShield,
  FaArrowRight,
} from "react-icons/fa";

const roles = [
  {
    number: "01",
    title: "Customer",
    label: "Send & Track",
    description:
      "Create parcels, manage shipments, make payments, and follow delivery progress from one place.",
    icon: FaUser,
    to: "/dashboard",
    accent: "teal",
  },
  {
    number: "02",
    title: "Rider",
    label: "Deliver & Earn",
    description:
      "Manage assigned deliveries, update parcel status, complete deliveries, and view your earnings.",
    icon: FaMotorcycle,
    to: "/beARider",
    accent: "amber",
  },
  {
    number: "03",
    title: "Admin",
    label: "Manage Operations",
    description:
      "Assign riders, manage applications, oversee deliveries, and keep the platform running smoothly.",
    icon: FaUserShield,
    to: "/login",
    accent: "teal",
  },
];

const Roles = () => (
  <section className="relative overflow-hidden bg-white sm:py-14 lg:pb-18 lg:pt-8">
    <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-teal-50/70 blur-3xl" />
    <div className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-amber-50/80 blur-3xl" />

    <div className="pc-container relative">
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-teal-700">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
          One platform, three roles
        </span>

        <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-[-0.03em] text-slate-950 sm:text-4xl lg:text-5xl">
          Everyone has a role in the
          <span className="text-teal-700"> delivery journey.</span>
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
          ProCurier connects customers, riders, and administrators through
          focused workflows that keep every delivery moving.
        </p>
      </div>

      <div className="mt-14 grid gap-5 lg:grid-cols-3">
        {roles.map((role) => {
          const Icon = role.icon;
          const amber = role.accent === "amber";

          return (
            <article
              key={role.title}
              className={`group relative overflow-hidden rounded-[1.75rem] border bg-white p-7 shadow-[0_12px_40px_rgba(15,23,42,.06)] transition-all duration-300 hover:-translate-y-2 ${
                amber
                  ? "border-amber-100 hover:border-amber-200 hover:shadow-[0_24px_60px_rgba(245,158,11,.13)]"
                  : "border-slate-200 hover:border-teal-200 hover:shadow-[0_24px_60px_rgba(15,118,110,.13)]"
              }`}
            >
              <div
                className={`absolute -right-14 -top-14 h-40 w-40 rounded-full blur-3xl transition-transform duration-500 group-hover:scale-125 ${
                  amber ? "bg-amber-50" : "bg-teal-50"
                }`}
              />

              <div className="relative flex items-start justify-between">
                <div
                  className={`grid h-16 w-16 place-items-center rounded-2xl text-2xl transition-all duration-300 group-hover:scale-105 ${
                    amber
                      ? "bg-amber-50 text-amber-600 group-hover:bg-amber-400 group-hover:text-slate-950"
                      : "bg-teal-50 text-teal-700 group-hover:bg-teal-700 group-hover:text-white"
                  }`}
                >
                  <Icon />
                </div>

                <span className="font-mono text-sm font-extrabold tracking-widest text-slate-200">
                  {role.number}
                </span>
              </div>

              <div className="relative mt-9">
                <p
                  className={`text-[10px] font-extrabold uppercase tracking-[0.15em] ${
                    amber ? "text-amber-600" : "text-teal-700"
                  }`}
                >
                  {role.label}
                </p>

                <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950">
                  {role.title}
                </h3>

                <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-500">
                  {role.description}
                </p>

                <Link
                  to={role.to}
                  className={`mt-7 inline-flex items-center gap-2 text-sm font-extrabold ${
                    amber
                      ? "text-amber-600 hover:text-slate-950"
                      : "text-teal-700 hover:text-slate-950"
                  }`}
                >
                  Explore role
                  <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              <div
                className={`absolute bottom-0 left-7 right-7 h-1 origin-left scale-x-0 rounded-t-full transition-transform duration-500 group-hover:scale-x-100 ${
                  amber ? "bg-amber-400" : "bg-teal-600"
                }`}
              />
            </article>
          );
        })}
      </div>
    </div>
  </section>
);

export default Roles;
