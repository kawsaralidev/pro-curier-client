import React from "react";
import BenefitCard from "./BenefitCard";

import trackingImg from "../../../assets/logos/Transit warehouse.png";
import safetyImg from "../../../assets/logos/Transit warehouse.png";
import supportImg from "../../../assets/logos/Transit warehouse.png";

const benefits = [
  {
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment with instant status updates. Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment",
    image: trackingImg,
  },
  {
    title: "100% Safe Delivery",
    description:
      "We ensure parcels are handled with the utmost care and delivered securely through a reliable and damage-free process.Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment",
    image: safetyImg,
  },
  {
    title: "24/7 Call Center Support",
    description:
      "Our support team is available around the clock to assist you with any questions, updates, or delivery concerns.Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment",
    image: supportImg,
  },
];

const Benefits = () => {
  return (
    <div className="py-16 bg-base-200">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold">Why Choose Us</h2>
          <p className="mt-4 text-base-content/70">
            Reliable logistics services designed to give you complete peace of
            mind.
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-6">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} {...benefit} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Benefits;
