import React from "react";

import logo1 from "../../../assets/logos/amazon.png";
import logo2 from "../../../assets/logos/amazon_vector.png";
import logo3 from "../../../assets/logos/casio.png";
import logo4 from "../../../assets/logos/moonstar.png";
import logo5 from "../../../assets/logos/randstad.png";
import logo6 from "../../../assets/logos/star.png";
import logo7 from "../../../assets/logos/start_people.png";

const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];

const ClientLogos = () => {
  return (
    <section className="overflow-hidden border-y border-slate-200 bg-white py-16">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 className="pc-title mb-10 text-center text-3xl">
          Trusted by Our Clients
        </h2>

        {/* Slider */}
        <div className="relative w-full overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {/* First set */}
            {logos.map((logo, index) => (
              <div
                key={index}
                className="flex items-center justify-center min-w-[160px] mx-6"
              >
                <img
                  src={logo}
                  alt="Client Logo"
                  className="h-10 w-auto object-contain grayscale opacity-70 transition hover:grayscale-0 hover:opacity-100 md:h-12"
                />
              </div>
            ))}

            {/* Duplicate set */}
            {logos.map((logo, index) => (
              <div
                key={`duplicate-${index}`}
                className="flex items-center justify-center min-w-[160px] mx-6"
              >
                <img
                  src={logo}
                  alt="Client Logo"
                  className="h-10 w-auto object-contain grayscale opacity-70 transition hover:grayscale-0 hover:opacity-100 md:h-12"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
