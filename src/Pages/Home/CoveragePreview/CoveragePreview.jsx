import { Link } from "react-router";
import { FaArrowRight, FaMapMarkerAlt } from "react-icons/fa";

const CoveragePreview = () => (
  <section className="bg-white sm:py-20">
    <div className="pc-container">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <span className="pc-kicker">Delivery network</span>
          <h2 className="pc-title mt-4 text-3xl sm:text-4xl lg:text-5xl">
            Built to reach every district.
          </h2>
          <p className="pc-muted mt-4 leading-7">
            Explore ProCurier's coverage network and check the delivery area for
            your next shipment.
          </p>
        </div>
        <div className="flex items-center gap-5 border-y border-slate-200 py-6 lg:min-w-[360px]">
          <FaMapMarkerAlt className="text-3xl text-teal-700" />
          <div>
            <p className="text-4xl font-extrabold text-slate-900">64</p>
            <p className="text-sm font-bold text-slate-500">
              District coverage
            </p>
          </div>
          <Link
            to="/coverage"
            className="ml-auto text-sm font-bold text-teal-700 hover:text-amber-500"
          >
            Explore <FaArrowRight className="ml-1 inline" />
          </Link>
        </div>
      </div>
    </div>
  </section>
);
export default CoveragePreview;
