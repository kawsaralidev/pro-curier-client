import {
  FaBoxOpen,
  FaUserCheck,
  FaMotorcycle,
  FaLocationArrow,
  FaCheckCircle,
} from "react-icons/fa";

const steps = [
  {
    number: "01",
    title: "Create Parcel",
    description: "Add parcel, receiver and destination details.",
    icon: FaBoxOpen,
  },
  {
    number: "02",
    title: "Assign Rider",
    description: "An available rider is assigned to the shipment.",
    icon: FaUserCheck,
  },
  {
    number: "03",
    title: "Rider Pickup",
    description: "The assigned rider collects the parcel.",
    icon: FaMotorcycle,
  },
  {
    number: "04",
    title: "Track Delivery",
    description: "Follow progress with the tracking ID.",
    icon: FaLocationArrow,
  },
  {
    number: "05",
    title: "Successful Delivery",
    description: "The parcel reaches the receiver.",
    icon: FaCheckCircle,
  },
];

const HowItWorks = () => (
  <section className="relative overflow-hidden bg-white py-20 sm:py-20 lg:py-20">
    <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-teal-50 blur-3xl" />

    <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-amber-50 blur-3xl" />

    <div className="pc-container relative">
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-teal-700">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
          How ProCurier works
        </span>

        <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-[-0.03em] text-slate-950 sm:text-4xl lg:text-5xl">
          One clear journey.
          <span className="text-teal-700"> Five simple steps.</span>
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
          From creating a parcel to successful delivery, ProCurier keeps every
          important milestone clear for customers, riders, and administrators.
        </p>
      </div>

      <div className="relative mt-14 lg:mt-16">
        {/* Desktop journey line */}
        <div className="absolute left-[10%] right-[10%] top-[31px] hidden h-px bg-gradient-to-r from-teal-200 via-teal-500 to-amber-300 lg:block" />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5 lg:gap-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const last = index === steps.length - 1;

            return (
              <div key={step.number} className="relative">
                <article className="group relative h-full rounded-[1.5rem] border border-slate-200 bg-white px-5 pb-6 pt-5 shadow-[0_8px_30px_rgba(15,23,42,.055)] transition-all duration-300 hover:-translate-y-2 hover:border-teal-200 hover:shadow-[0_20px_45px_rgba(15,118,110,.12)]">
                  <div className="flex items-start justify-between">
                    <div
                      className={`relative z-10 grid h-[62px] w-[62px] place-items-center rounded-2xl shadow-sm transition-all duration-300 group-hover:scale-105 ${
                        last
                          ? "bg-amber-400 text-slate-950"
                          : "bg-teal-700 text-white"
                      }`}
                    >
                      <Icon className="text-xl" />

                      <span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full border-2 border-white bg-slate-950 font-mono text-[9px] font-bold text-white">
                        {step.number}
                      </span>
                    </div>

                    <span className="font-mono text-[10px] font-bold tracking-widest text-slate-300">
                      STEP
                    </span>
                  </div>

                  <h3 className="mt-7 text-lg font-extrabold tracking-tight text-slate-950">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {step.description}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-400">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        last ? "bg-amber-400" : "bg-teal-600"
                      }`}
                    />

                    {last ? "Completed" : "Next milestone"}
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-2xl items-center justify-center gap-3 text-center">
        <span className="h-px flex-1 bg-slate-200" />

        <span className="text-xs font-semibold text-slate-400">
          Simple workflow. Clear delivery.
        </span>

        <span className="h-px flex-1 bg-slate-200" />
      </div>
    </div>
  </section>
);

export default HowItWorks;
