import { FaTruckMoving } from "react-icons/fa";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      {/* Truck Icon */}
      <FaTruckMoving className="text-primary text-5xl animate-bounce" />

      {/* DaisyUI Spinner */}
      <span className="loading loading-ring loading-lg text-primary"></span>

      {/* Text */}
      <p className="text-lg font-semibold text-base-content">
        Delivering your data...
      </p>
    </div>
  );
};

export default Loading;
