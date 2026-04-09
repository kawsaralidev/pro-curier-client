import React from "react";
import Banner from "../Banner/Banner";
import Services from "../Services/Services";
import ClientLogos from "../ClientLogos/ClientLogos";
import Benefits from "../Benefits/Benefits";
import BeMerchant from "../BeMerchant/BeMerchant";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Services></Services>
      <ClientLogos></ClientLogos>
      <Benefits></Benefits>
      <BeMerchant></BeMerchant>
    </div>
  );
};

export default Home;
