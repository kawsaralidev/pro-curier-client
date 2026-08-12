import { Link } from "react-router";
import {
  FaArrowRight,
  FaBoxOpen,
  FaUserCheck,
  FaMotorcycle,
  FaCheckCircle,
} from "react-icons/fa";

const milestones = [
  {
    number: "01",
    title: "Parcel created",
    icon: FaBoxOpen,
  },
  {
    number: "02",
    title: "Rider assigned",
    icon: FaUserCheck,
  },
  {
    number: "03",
    title: "Out for delivery",
    icon: FaMotorcycle,
  },
  {
    number: "04",
    title: "Successfully delivered",
    icon: FaCheckCircle,
  },
];

const Tracking = () => (
  <section className="relative overflow-hidden bg-white  lg:py-8">
    <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-teal-50 blur-3xl" />
    <div className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-amber-50 blur-3xl" />

    <div className="pc-container relative">
      <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <span className="pc-kicker">Parcel visibility</span>

          <h2 className="pc-title mt-4 text-3xl sm:text-4xl lg:text-5xl">
            Know where your parcel is.
            <span className="text-teal-700"> Every step.</span>
          </h2>

          <p className="pc-muted mt-5 max-w-2xl text-base leading-7 sm:text-lg">
            Follow the journey from rider pickup to successful delivery with
            clear milestones and a dedicated tracking experience.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/dashboard/track"
              className="btn h-12 rounded-xl border-0 bg-teal-700 px-6 font-bold text-white shadow-lg shadow-teal-700/15 hover:bg-teal-800"
            >
              Track a Parcel
              <FaArrowRight />
            </Link>

            <Link
              to="/sendParcel"
              className="btn h-12 rounded-xl border border-slate-200 bg-white px-6 font-bold text-slate-800 hover:border-teal-200 hover:bg-teal-50"
            >
              Send a Parcel
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-[0_20px_60px_rgba(15,23,42,.08)] sm:p-8">
            <div className="flex items-center justify-between border-b border-slate-200 pb-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                  Delivery journey
                </p>
                <p className="mt-1 font-extrabold text-slate-950">
                  Tracking timeline
                </p>
              </div>

              <span className="rounded-full bg-teal-50 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-teal-700">
                Live status
              </span>
            </div>

            <div className="relative mt-7">
              <div className="absolute bottom-7 left-[20px] top-7 w-px bg-gradient-to-b from-teal-500 via-teal-400 to-amber-400" />

              {milestones.map((milestone, index) => {
                const Icon = milestone.icon;
                const completed = index === milestones.length - 1;

                return (
                  <div
                    key={milestone.number}
                    className="group relative flex gap-5 py-4 first:pt-0 last:pb-0"
                  >
                    <div
                      className={`relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border-4 border-slate-50 shadow-sm transition-transform duration-300 group-hover:scale-110 ${
                        completed
                          ? "bg-amber-400 text-slate-950"
                          : "bg-teal-700 text-white"
                      }`}
                    >
                      <Icon className="text-sm" />
                    </div>

                    <div className="min-w-0 pt-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-[10px] font-bold text-slate-400">
                          {milestone.number}
                        </span>
                        <p className="text-sm font-extrabold text-slate-900">
                          {milestone.title}
                        </p>
                      </div>

                      <p className="mt-1 text-xs text-slate-400">
                        {completed
                          ? "Delivery journey completed"
                          : "Milestone recorded in the delivery journey"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="absolute -bottom-5 -left-4 hidden rounded-xl border border-teal-100 bg-white px-4 py-3 shadow-lg sm:block">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Visibility
            </p>
            <p className="mt-1 text-sm font-extrabold text-teal-700">
              Clear at every milestone
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Tracking;
