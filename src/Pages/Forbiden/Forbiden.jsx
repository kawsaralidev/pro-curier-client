import { FaBan, FaHome } from "react-icons/fa";
import { Link } from "react-router";

const Forbiden = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
      <FaBan className="text-6xl text-error mb-4" />

      <h1 className="text-4xl font-bold mb-2">Access Forbidden</h1>

      <p className="text-gray-500 mb-6 max-w-md">
        You don’t have permission to access this page. If you think this is a
        mistake, please contact the administrator.
      </p>

      <Link to="/" className="btn btn-primary">
        <FaHome className="mr-2" />
        Go Home
      </Link>
    </div>
  );
};

export default Forbiden;
