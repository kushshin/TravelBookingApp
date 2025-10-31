import { useLocation, Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

function Result() {
  const { state } = useLocation();
  const { success, booking } = state || {};

  if (success && booking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      
        <CheckCircle className="text-green-500 w-16 h-16 mb-4" />

       
        <h1 className="text-2xl font-semibold text-gray-800">
          Booking Confirmed
        </h1>
        <p className="text-gray-500 mt-2 text-sm">
          Ref ID: {booking._id?.slice(-8).toUpperCase() || "HUF56&SO"}
        </p>

      
        <Link
          to="/"
          className="mt-6 bg-gray-200 text-gray-700 px-6 py-2 rounded-md text-sm hover:bg-gray-300 transition"
        >
          Back to Home
        </Link>
      </div>
    );
  }

 
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-2xl font-semibold text-red-600 mb-2">
        Booking Failed
      </h1>
      <p className="text-gray-500 mb-6 text-sm">
        Something went wrong. Please try again later.
      </p>
      <Link
        to="/"
        className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md text-sm hover:bg-gray-300 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default Result;
