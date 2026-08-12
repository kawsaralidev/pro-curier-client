import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router";
import banner1 from "../../../assets/Banner/banner1.png";
import banner6 from "../../../assets/Banner/banner6.png";

const slides = [
  {
    image: banner1,
    eyebrow: "Fast • Secure • Trackable",
    title: "Move every parcel with confidence.",
    highlight: "confidence.",
    description:
      "Create a delivery in seconds, follow every milestone, and keep customers informed from pickup to final delivery.",
    primary: { label: "Send a Parcel", to: "/sendParcel" },
    secondary: { label: "Track a Parcel", to: "/login" },
    metrics: [
      ["01", "Create"],
      ["02", "Track"],
      ["03", "Deliver"],
    ],
  },
  {
    image: banner6,
    eyebrow: "Built for modern delivery operations",
    title: "One platform for every delivery journey.",
    highlight: "every delivery journey.",
    description:
      "ProCurier connects customers, riders, and administrators through a clear workflow built around reliable parcel delivery.",
    primary: { label: "Explore Coverage", to: "/coverage" },
    secondary: { label: "Become a Rider", to: "/beARider" },
    metrics: [
      ["64", "Districts"],
      ["24/7", "Visibility"],
      ["3", "Roles"],
    ],
  },
];

const Banner = () => (
  <section className="relative overflow-hidden bg-slate-950">
    <Carousel
      autoPlay
      infiniteLoop
      interval={6000}
      transitionTime={650}
      showThumbs={false}
      showStatus={false}
      showArrows
      showIndicators
      swipeable
      emulateTouch
      className="pc-hero-carousel"
    >
      {slides.map((slide) => (
        <div
          key={slide.title}
          className="relative min-h-[560px] overflow-hidden bg-slate-950 text-left sm:min-h-[640px] lg:min-h-[680px]"
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="absolute inset-0 h-full w-full object-cover object-center opacity-55"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(15,118,110,.25),transparent_34%)]" />

          <div className="relative z-10 mx-auto flex min-h-[560px] max-w-7xl items-center px-5 py-16 sm:min-h-[640px] sm:px-8 lg:min-h-[680px] lg:px-10">
            <div className="grid w-full items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-teal-300/25 bg-teal-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-teal-200 backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_0_4px_rgba(245,158,11,.12)]" />
                  {slide.eyebrow}
                </div>

                <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl xl:text-7xl">
                  {slide.title.replace(slide.highlight, "")}
                  <span className="text-amber-400">{slide.highlight}</span>
                </h1>

                <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
                  {slide.description}
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    to={slide.primary.to}
                    className="btn h-12 rounded-xl border-0 bg-teal-600 px-6 font-bold text-white shadow-lg shadow-teal-950/30 hover:bg-teal-500"
                  >
                    {slide.primary.label}
                    <span aria-hidden="true">→</span>
                  </Link>

                  <Link
                    to={slide.secondary.to}
                    className="btn h-12 rounded-xl border border-white/20 bg-white/10 px-6 font-bold text-white backdrop-blur hover:border-white/30 hover:bg-white/15"
                  >
                    {slide.secondary.label}
                  </Link>
                </div>

                <div className="mt-10 grid max-w-lg grid-cols-3 border-t border-white/10 pt-5">
                  {slide.metrics.map(([value, label]) => (
                    <div
                      key={label}
                      className="border-r border-white/10 pl-3 first:pl-0 last:border-r-0"
                    >
                      <p className="text-lg font-extrabold text-white sm:text-xl">
                        {value}
                      </p>
                      <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="hidden lg:flex lg:justify-end">
                <div className="relative w-full max-w-[480px]">
                  <div className="absolute -inset-5 rounded-[2rem] bg-teal-500/10 blur-2xl" />
                  <div className="relative rounded-[2rem] border border-white/15 bg-white/10 p-3 shadow-2xl backdrop-blur-md">
                    <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-900">
                      <img
                        src={slide.image}
                        alt=""
                        className="h-[300px] w-full object-cover"
                      />
                      <div className="flex items-center justify-between gap-4 p-5">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-teal-300">
                            ProCurier delivery
                          </p>
                          <p className="mt-1 text-sm font-semibold text-white">
                            Clear status. Better control.
                          </p>
                        </div>
                        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-amber-400 font-black text-slate-950">
                          ✓
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  </section>
);

export default Banner;
