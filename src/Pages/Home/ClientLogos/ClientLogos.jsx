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
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-blue-950 mb-10">
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
                  className="h-12 md:h-16 object-contain grayscale hover:grayscale-0 transition"
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
                  className="h-12 md:h-6 object-contain grayscale hover:grayscale-0 transition"
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
