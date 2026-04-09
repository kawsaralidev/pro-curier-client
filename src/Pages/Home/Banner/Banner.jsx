import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import banner3 from "../../../assets/Banner/banner3.png";

const Banner = () => {
  return (
    <Carousel>
      <div className="flex">
        <p className="legend">Legend 1</p>
        <img src={banner3} />
      </div>
      <div>
        <img src="assets/2.jpeg" />
        <p className="legend">Legend 2</p>
      </div>
      <div>
        <img src="assets/3.jpeg" />
        <p className="legend">Legend 3</p>
      </div>
    </Carousel>
  );
};

export default Banner;
