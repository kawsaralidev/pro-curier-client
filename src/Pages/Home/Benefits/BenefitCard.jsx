import React from "react";

const BenefitCard = ({ image, title, description }) => {
  return (
    <div className="card card-side bg-base-100 shadow-md hover:shadow-lg transition p-5">
      {/* Left Image */}
      <figure className="pl-6">
        <img src={image} alt={title} className="w-60 h-35 object-contain" />
      </figure>

      {/* Divider */}
      <div className="divider divider-horizontal mx-0"></div>

      {/* Content */}
      <div className="card-body">
        <h3 className="card-title text-xl text-orange-5 00">{title}</h3>
        <p className="text-base-content/70">{description}</p>
      </div>
    </div>
  );
};

export default BenefitCard;
