import { FaRoute, FaShieldAlt, FaHeadset } from "react-icons/fa";

const benefits = [
  {
    number: "01",
    title: "Live Parcel Tracking",
    description:
      "Follow every important delivery milestone from rider pickup to successful completion.",
    icon: FaRoute,
    accent: "teal",
  },
  {
    number: "02",
    title: "Safe & Structured Delivery",
    description:
      "A clear role-based workflow keeps customers, riders, and administrators connected.",
    icon: FaShieldAlt,
    accent: "amber",
  },
  {
    number: "03",
    title: "Focused Support",
    description:
      "Organized dashboards and delivery history make every shipment easier to manage.",
    icon: FaHeadset,
    accent: "teal",
  },
];

const Benefits = () => (
  <section className="relative overflow-hidden bg-white sm:py-20 lg:py-20">
    <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-teal-50/70 blur-3xl" />
    <div className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-amber-50/80 blur-3xl" />

    <div className="pc-container relative">
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-teal-700">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
          Why ProCurier
        </span>

        <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-[-0.03em] text-slate-950 sm:text-4xl lg:text-5xl">
          More than delivery.
          <span className="text-teal-700"> A better experience.</span>
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
          Everything is designed to keep parcel operations clear, dependable,
          and easy to manage from the first step to the final delivery.
        </p>
      </div>

      <div className="relative mt-10">
        <div className="grid gap-4 lg:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            const amber = benefit.accent === "amber";

            return (
              <article
                key={benefit.title}
                className={`group relative min-h-[200px] overflow-hidden rounded-[1.75rem] border bg-white p-7 transition-all duration-300 hover:-translate-y-2 ${
                  amber
                    ? "border-amber-100 hover:border-amber-200 hover:shadow-[0_24px_60px_rgba(245,158,11,.12)]"
                    : "border-slate-200 hover:border-teal-200 hover:shadow-[0_24px_60px_rgba(15,118,110,.12)]"
                }`}
              >
                <div
                  className={`absolute -right-12 -top-12 h-36 w-36 rounded-full blur-2xl transition-transform duration-500 group-hover:scale-125 ${
                    amber ? "bg-amber-50" : "bg-teal-50"
                  }`}
                />

                <div className="relative flex items-start justify-between">
                  <div
                    className={`grid h-14 w-14 place-items-center rounded-2xl text-xl transition-all duration-300 group-hover:scale-105 ${
                      amber
                        ? "bg-amber-50 text-amber-600 group-hover:bg-amber-400 group-hover:text-slate-950"
                        : "bg-teal-50 text-teal-700 group-hover:bg-teal-700 group-hover:text-white"
                    }`}
                  >
                    <Icon />
                  </div>

                  <span className="font-mono text-sm font-extrabold tracking-wider text-slate-200">
                    {benefit.number}
                  </span>
                </div>

                <div className="relative my-5">
                  <h3 className="text-xl font-extrabold tracking-tight text-slate-950">
                    {benefit.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {benefit.description}
                  </p>
                </div>

                <div className="absolute bottom-0 left-7 right-7 h-1 overflow-hidden rounded-t-full bg-slate-100">
                  <div
                    className={`h-full w-0 transition-all duration-500 group-hover:w-full ${
                      amber ? "bg-amber-400" : "bg-teal-600"
                    }`}
                  />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

export default Benefits;
