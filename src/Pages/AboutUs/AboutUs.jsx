import { createElement } from "react";
import {
  FaBullseye,
  FaGlobeAsia,
  FaHandshake,
  FaRoute,
  FaShieldAlt,
} from "react-icons/fa";

const values = [
  {
    icon: FaBullseye,
    title: "Purpose-driven delivery",
    text: "We keep every shipment focused on one goal: a simple, dependable delivery experience.",
    tag: "01",
  },
  {
    icon: FaShieldAlt,
    title: "Trust at every step",
    text: "Clear parcel status and responsible operations help customers stay confident throughout the journey.",
    tag: "02",
  },
  {
    icon: FaRoute,
    title: "Connected logistics",
    text: "Customers, riders, and operations work together through one connected delivery platform.",
    tag: "03",
  },
];

const AboutUs = () => {
  return (
    <main className="overflow-x-hidden bg-white text-slate-950">
      {/* =========================================================
          HERO — KEEPING YOUR EXISTING DESIGN
      ========================================================== */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(13,148,136,.28),transparent_32%),radial-gradient(circle_at_85%_80%,rgba(245,158,11,.18),transparent_30%)]" />

        <div className="pc-container relative py-12 sm:py-12 lg:py-16">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-teal-400/20 bg-teal-400/10 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-teal-300">
                About ProCurier
              </span>

              <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] text-white sm:text-5xl lg:text-7xl">
                Moving parcels.
                <br />
                <span className="text-teal-400">Connecting people.</span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                ProCurier is a modern parcel delivery platform built to make
                sending, managing, and tracking deliveries clear and reliable
                for customers, riders, and operations teams.
              </p>

              <div className="mt-8 grid grid-cols-3 gap-2 sm:mt-9 sm:flex sm:flex-wrap sm:gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3 backdrop-blur sm:px-5 sm:py-4">
                  <p className="text-xl font-extrabold text-white sm:text-2xl">64+</p>
                  <p className="mt-1 text-[10px] font-semibold leading-4 text-slate-400 sm:text-xs">
                    District coverage
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3 backdrop-blur sm:px-5 sm:py-4">
                  <p className="text-xl font-extrabold text-white sm:text-2xl">24/7</p>
                  <p className="mt-1 text-[10px] font-semibold leading-4 text-slate-400 sm:text-xs">
                    Parcel visibility
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3 backdrop-blur sm:px-5 sm:py-4">
                  <p className="text-xl font-extrabold text-white sm:text-2xl">3</p>
                  <p className="mt-1 text-[10px] font-semibold leading-4 text-slate-400 sm:text-xs">
                    Connected roles
                  </p>
                </div>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute -inset-6 rounded-[3rem] bg-teal-500/10 blur-3xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.07] p-5 shadow-2xl backdrop-blur-xl sm:p-8">
                <div className="flex items-center justify-between border-b border-white/10 pb-6">
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-teal-300">
                      Delivery ecosystem
                    </p>

                    <p className="mt-2 text-lg font-extrabold text-white">
                      One connected journey
                    </p>
                  </div>

                  <FaGlobeAsia className="text-3xl text-amber-400" />
                </div>

                <div className="relative mt-8 space-y-5">
                  {[
                    ["01", "Customer", "Creates & tracks"],
                    ["02", "Rider", "Picks up & delivers"],
                    ["03", "Operations", "Coordinates the journey"],
                  ].map(([number, title, text]) => (
                    <div key={number} className="flex items-center gap-4">
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-teal-500/15 font-mono text-xs font-bold text-teal-300 ring-1 ring-teal-400/20">
                        {number}
                      </div>

                      <div>
                        <p className="font-bold text-white">{title}</p>

                        <p className="mt-1 text-xs text-slate-400">{text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-2xl border border-amber-400/15 bg-amber-400/10 p-4">
                  <p className="text-sm font-bold text-amber-300">
                    Clear delivery. Better experience.
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    Every feature is designed around visibility, simplicity, and
                    dependable parcel movement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          OUR STORY — UNIQUE EDITORIAL TIMELINE DESIGN
      ========================================================== */}
      <section className="relative overflow-hidden bg-white py-14 sm:py-14 lg:py-18">
        <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-teal-50 blur-3xl" />

        <div className="pc-container relative">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            {/* Left */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <span className="pc-kicker">Our story</span>

              <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-[-0.03em] text-slate-950 sm:text-4xl lg:text-5xl">
                Built around a better
                <span className="text-teal-700"> delivery experience.</span>
              </h2>

              <div className="mt-8 hidden h-px w-28 bg-gradient-to-r from-teal-600 to-amber-400 lg:block" />

              <p className="mt-6 max-w-md text-sm leading-7 text-slate-500">
                More than a parcel service, ProCurier connects people,
                technology, and logistics into one simple journey.
              </p>
            </div>

            {/* Right */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute bottom-5 left-[19px] top-5 w-px bg-gradient-to-b from-teal-500 via-slate-200 to-amber-400" />

              <div className="space-y-10 sm:space-y-9">
                {/* Story 01 */}
                <div className="relative flex gap-6">
                  <div className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border-4 border-white bg-teal-700 text-xs font-extrabold text-white shadow-lg shadow-teal-700/20">
                    01
                  </div>

                  <div className="pt-1">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-teal-700">
                      The idea
                    </p>

                    <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950">
                      A clearer way to move parcels.
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-500 sm:text-base">
                      ProCurier was designed as a complete parcel delivery
                      experience rather than just a shipment form. The platform
                      connects the people and processes involved in a delivery,
                      from parcel creation to successful delivery.
                    </p>
                  </div>
                </div>

                {/* Story 02 */}
                <div className="relative flex gap-6">
                  <div className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border-4 border-white bg-slate-950 text-xs font-extrabold text-white shadow-lg">
                    02
                  </div>

                  <div className="pt-1">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-slate-600">
                      The experience
                    </p>

                    <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950">
                      Every role has a clear purpose.
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-500 sm:text-base">
                      Customers can create parcels, review delivery information,
                      follow tracking milestones, and manage shipments. Riders
                      can apply to join the network and take part in the
                      delivery workflow, while administrators coordinate
                      operations.
                    </p>
                  </div>
                </div>

                {/* Story 03 */}
                <div className="relative flex gap-6">
                  <div className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border-4 border-white bg-amber-400 text-xs font-extrabold text-slate-950 shadow-lg shadow-amber-400/20">
                    03
                  </div>

                  <div className="pt-1">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-amber-600">
                      The result
                    </p>

                    <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950">
                      One journey. Less uncertainty.
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-500 sm:text-base">
                      The result is a focused logistics platform where every
                      stage has a clear purpose and every important parcel
                      milestone is easier to understand.
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating journey label */}
              <div className="mt-8 ml-0 inline-flex max-w-full items-center gap-3 rounded-2xl sm:mt-10 sm:ml-16 border border-slate-200 bg-slate-50 px-5 py-4 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-teal-600" />

                <span className="text-xs font-extrabold uppercase tracking-[0.12em] text-slate-600">
                  From creation to delivery
                </span>

                <span className="text-amber-500">→</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          WHAT DRIVES US — ASYMMETRIC UNIQUE DESIGN
      ========================================================== */}
      <section className="relative overflow-hidden bg-slate-50 py-14 sm:py-20 lg:py-12">
        <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-teal-100/50 blur-3xl" />

        <div className="pc-container relative">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div>
              <span className="pc-kicker">What drives us</span>

              <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-[-0.03em] text-slate-950 sm:text-4xl lg:text-5xl">
                Simple principles.
                <br />
                <span className="text-teal-700">Strong delivery.</span>
              </h2>
            </div>

            <p className="max-w-2xl text-sm leading-7 text-slate-500 sm:text-base lg:justify-self-end">
              The product is shaped around practical logistics needs, clear
              communication, and a dependable experience for everyone involved
              in the delivery journey.
            </p>
          </div>

          {/* Values */}
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {values.map(({ icon, title, text, tag }, index) => (
              <article
                key={title}
                className={`group relative overflow-hidden rounded-[2rem] border bg-white p-7 transition-all duration-500 hover:-translate-y-2 ${
                  index === 1
                    ? "border-teal-200 shadow-[0_20px_60px_rgba(15,118,110,.10)]"
                    : "border-slate-200 shadow-sm hover:border-teal-200 hover:shadow-[0_20px_50px_rgba(15,23,42,.08)]"
                }`}
              >
                {/* Large background number */}
                <span className="pointer-events-none absolute -right-3 -top-7 text-[8rem] font-black leading-none text-slate-50 transition duration-500 group-hover:text-teal-50">
                  {tag}
                </span>

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div
                      className={`grid h-14 w-14 place-items-center rounded-2xl text-xl transition-all duration-300 ${
                        index === 1
                          ? "bg-teal-700 text-white group-hover:bg-amber-400 group-hover:text-slate-950"
                          : "bg-teal-50 text-teal-700 group-hover:bg-teal-700 group-hover:text-white"
                      }`}
                    >
                      {createElement(icon)}
                    </div>

                    <span className="rounded-full border border-slate-200 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                      Principle {tag}
                    </span>
                  </div>

                  <h3 className="mt-10 text-xl font-extrabold tracking-tight text-slate-950">
                    {title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    {text}
                  </p>

                  <div className="mt-7 h-1 w-10 rounded-full bg-gradient-to-r from-teal-600 to-amber-400 transition-all duration-500 group-hover:w-20" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          CLOSING — UNIQUE DARK STATEMENT
      ========================================================== */}
      <section className="relative overflow-hidden bg-white py-16 sm:py-24 lg:py-18">
        <div className="pc-container">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 px-6 py-14 shadow-[0_30px_90px_rgba(15,23,42,.15)] sm:px-10 lg:px-16 lg:py-20">
            {/* Background graphics */}
            <div className="absolute -right-24 -top-32 h-80 w-80 rounded-full border border-teal-400/10 bg-teal-500/10 blur-3xl" />

            <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full border border-amber-400/10 bg-amber-400/10 blur-3xl" />

            <div className="relative grid items-center gap-12 lg:grid-cols-[1fr_auto]">
              <div>
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-teal-500/10 text-xl text-teal-400 ring-1 ring-teal-400/20">
                    <FaHandshake />
                  </div>

                  <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-teal-300">
                    The ProCurier promise
                  </span>
                </div>

                <h2 className="mt-7 max-w-3xl text-3xl font-extrabold leading-tight tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl">
                  Delivering more than parcels.
                  <span className="text-teal-400"> Building confidence.</span>
                </h2>

                <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                  ProCurier brings customers, riders, and operations together to
                  create a delivery experience that feels clear from beginning
                  to end.
                </p>
              </div>

              {/* Right visual */}
              <div className="relative mx-auto lg:mx-0">
                <div className="grid h-36 w-36 place-items-center rounded-full border border-teal-400/20 bg-teal-500/5">
                  <div className="grid h-24 w-24 place-items-center rounded-full border border-amber-400/20 bg-amber-400/5">
                    <FaRoute className="text-3xl text-amber-400" />
                  </div>
                </div>

                <div className="absolute -right-7 top-5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur">
                  <p className="text-[9px] font-extrabold uppercase tracking-wider text-teal-300">
                    Track
                  </p>
                </div>

                <div className="absolute -bottom-3 -left-8 rounded-xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur">
                  <p className="text-[9px] font-extrabold uppercase tracking-wider text-amber-300">
                    Deliver
                  </p>
                </div>
              </div>
            </div>

            <div className="relative mt-12 border-t border-white/10 pt-6">
              <div className="flex flex-col gap-3 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                <span>Simple workflow. Clear milestones. Better control.</span>

                <span className="font-mono uppercase tracking-[0.15em] text-slate-600">
                  ProCurier
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUs;
