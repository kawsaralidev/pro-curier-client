import Banner from "../Banner/Banner";
import Services from "../Services/Services";
import HowItWorks from "../HowItWorks/HowItWorks";
import Benefits from "../Benefits/Benefits";
import Tracking from "../Tracking/Tracking";
import CoveragePreview from "../CoveragePreview/CoveragePreview";
import Roles from "../Roles/Roles";

const Home = () => (
  <main className="pc-page bg-slate-50">
    <Banner />
    <HowItWorks />
    <Services />
    <Benefits />
    <Tracking />
    <CoveragePreview />
    <Roles />
  </main>
);

export default Home;
