import {
  FaShippingFast,
  FaMapMarkedAlt,
  FaMoneyBillWave,
  FaBuilding,
  FaUndo,
  FaWarehouse,
} from "react-icons/fa";

const services = [
  {
    number: "01",
    title: "Express Delivery",
    description: "Fast, dependable delivery for time-sensitive parcels.",
    icon: FaShippingFast,
  },
  {
    number: "02",
    title: "Nationwide Delivery",
    description: "Reach customers across Bangladesh with broad coverage.",
    icon: FaMapMarkedAlt,
  },
  {
    number: "03",
    title: "Cash on Delivery",
    description: "Convenient payment on delivery with shipment visibility.",
    icon: FaMoneyBillWave,
  },
  {
    number: "04",
    title: "Corporate Logistics",
    description: "Organized parcel operations for growing businesses.",
    icon: FaBuilding,
  },
  {
    number: "05",
    title: "Parcel Return",
    description: "A smoother reverse-delivery flow for returns and exchanges.",
    icon: FaUndo,
  },
  {
    number: "06",
    title: "Fulfillment",
    description:
      "Connected packing, dispatch, delivery, and after-sales operations.",
    icon: FaWarehouse,
  },
];

const Services = () => (
  <section className="bg-white sm:py-3">
    <div className="pc-container">
      <div className="max-w-3xl">
        <span className="pc-kicker">Our services</span>

        <h2 className="pc-title mt-4 text-3xl sm:text-4xl lg:text-5xl">
          Delivery solutions built
          <span className="text-teal-700"> around real needs.</span>
        </h2>

        <p className="pc-muted mt-4 max-w-2xl text-base leading-7 sm:text-lg">
          From a single shipment to business-scale logistics, ProCurier keeps
          delivery simple, visible, and dependable.
        </p>
      </div>

      <div className="mt-12 grid border-y border-slate-200 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => {
          const Icon = service.icon;

          return (
            <div
              key={service.title}
              className={`group flex gap-5 border-slate-200 py-7 sm:px-6 lg:px-7 ${
                index % 2 === 0 ? "sm:border-r" : ""
              } ${
                index === 2 || index === 5 ? "lg:border-r-0" : "lg:border-r"
              } ${index >= 3 ? "border-t" : ""}`}
            >
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-teal-50 text-lg text-teal-700 transition-all duration-300 group-hover:bg-teal-700 group-hover:text-white">
                <Icon />
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-amber-500">
                    {service.number}
                  </span>

                  <h3 className="font-extrabold text-slate-900">
                    {service.title}
                  </h3>
                </div>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {service.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default Services;
