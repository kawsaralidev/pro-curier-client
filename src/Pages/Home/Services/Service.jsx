import React from "react";

const Service = ({ service }) => {
  const { icon: Icon, title, description } = service;
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="text-4xl mb-4 text-orange-500">
        <Icon />
      </div>
      <h3 className="text-xl text-blue-950 font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

export default Service;
