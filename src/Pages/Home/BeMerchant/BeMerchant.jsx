import React from "react";
import layer1 from "../../../assets/logos/Layer_1.png";

const BeMerchant = () => {
  return (
    <div className="hero bg-[url('../../../assets/be-a-merchant-bg')] bg-[#03373D] p-20 rounded-4xl ">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src={layer1} className=" rounded-lg shadow-2xl" />
        <div>
          <h1 className="text-4xl font-bold">
            Merchant and Customer Satisfaction is Our First Priority
          </h1>
          <p className="py-6">
            We offer the lowest delivery charge with the highest value along
            with 100% safety of your product. Pathao courier delivers your
            parcels in every corner of Bangladesh right on time.
          </p>

          <button className="btn rounded-3xl p-5 mr-4 btn-primary">
            Become a Merchent
          </button>
          <button className="btn rounded-3xl p-5 btn-outline">
            Become a Merchent
          </button>
        </div>
      </div>
    </div>
  );
};

export default BeMerchant;
