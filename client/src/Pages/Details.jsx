import React, { useState, useEffect } from "react";
import { ArrowLeft, Search } from "lucide-react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Details = () => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [exp, setExp] = useState(null);
  const [success, setSuccess] = useState(false);
  const [selectedSlotDate, setSelectedSlotDate] = useState(null);
   const [selectedSlotTime, setSelectedSlotTime] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

 
  const getExperience = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/experiences/${id}`);
      setExp(res.data);
    } catch (error) {
      console.error("Error fetching experience:", error);
    }
  };

  useEffect(() => {
    getExperience();
  }, [id]);

  if (!exp) return <div className="text-center py-10">Loading...</div>;

  const basePrice = exp.price || 999;
  const tax = 59;
  const total = basePrice * quantity + tax;

 
  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => quantity > 1 && setQuantity((prev) => prev - 1);

 
  const handleConfirmBooking = async() => {
    if (!selectedSlotDate && !selectedSlotTime) {
      setError("Please select a date and time before confirming!");
      return;
    }
    try {
      setLoading(true);
      setError("");

      setSuccess(true);
      navigate("/CheckOut", {
  state: {
    experienceId: exp._id,
    date: selectedSlotDate.date,
    time: selectedSlotTime.time,
    quantity,
    price: total,
    experience:exp
  },
});
     
    } catch (err) {
      console.error("Booking failed:", err);
      setError("Something went wrong while booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
     
      <header className="bg-black text-white flex justify-between items-center px-4 sm:px-10 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-1 rounded-full hover:bg-gray-800 transition"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="font-semibold text-sm sm:text-base">Details</h1>
        </div>

        <div className="hidden sm:flex items-center bg-white rounded-lg overflow-hidden">
          <input
            type="text"
            placeholder="Search"
            className="px-3 py-1.5 text-sm text-gray-700 outline-none w-40 sm:w-56"
          />
          <button className="bg-yellow-400 px-3 py-1.5">
            <Search className="text-black" size={16} />
          </button>
        </div>
      </header>

     
      <div className="flex justify-center py-8 px-4">
        <div className="w-full max-w-6xl bg-white rounded-2xl shadow-md flex flex-col lg:flex-row gap-10 p-6 lg:p-10">
        
          <div className="flex-1">
            <img
              src={exp.image}
              alt={exp.title}
              className="rounded-xl w-full h-72 object-cover"
            />
            <h1 className="text-2xl font-bold mt-4">{exp.title}</h1>
            <p className="text-gray-600 mt-2">{exp.description}</p>

           
            <h2 className="mt-6 font-semibold text-lg">Available Slots</h2>
            <div className="flex flex-wrap gap-3 mt-3">
              {exp.slots
                ?.filter((s) => s.available)
                .map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedSlotDate(s)}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                      selectedSlotDate === s
                        ? "bg-[#FFD60A] border-[#FFD60A] text-black"
                        : "border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {s.date}
                  </button>
                ))}
            </div>
                <div className="flex flex-wrap gap-3 mt-3">
              {exp.slots
                ?.filter((s) => s.available)
                .map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedSlotTime(s)}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                      selectedSlotTime === s
                        ? "bg-[#FFD60A] border-[#FFD60A] text-black"
                        : "border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {s.time}
                  </button>
                ))}
            </div>
          
            <div className="mt-6">
              <h3 className="text-base font-semibold mb-2">About</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Scenic routes, trained guides, and safety briefing. Minimum age: 10.
              </p>
            </div>
          </div>

       
          <div className="lg:w-1/3 w-full bg-[#fafafa] border border-gray-200 rounded-xl p-6 h-fit self-start">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-3 mb-4">
              Booking Details
            </h3>

            <div className="flex justify-between text-gray-700 mb-3">
              <span>Base Price</span>
              <span>₹{basePrice}</span>
            </div>

          
            <div className="flex justify-between items-center text-gray-700 mb-3">
              <span>Quantity</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleDecrement}
                  className="w-7 h-7 flex justify-center items-center bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >
                  −
                </button>
                <span className="w-6 text-center">{quantity}</span>
                <button
                  onClick={handleIncrement}
                  className="w-7 h-7 flex justify-center items-center bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex justify-between text-gray-700 mb-2">
              <span>Subtotal</span>
              <span>₹{basePrice * quantity}</span>
            </div>
            <div className="flex justify-between text-gray-700 mb-2">
              <span>Taxes</span>
              <span>₹{tax}</span>
            </div>

            <hr className="my-3 border-gray-300" />

            <div className="flex justify-between items-center font-semibold text-gray-900">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
            {success && <p className="text-green-600 text-sm mt-3">Booking Confirmed 🎉</p>}

            <button
              onClick={handleConfirmBooking}
              disabled={loading}
              className={`mt-5 w-full ${
                loading ? "bg-gray-400" : "bg-[#FFD60A] hover:bg-[#e6c200]"
              } text-black font-semibold py-2.5 rounded-lg transition-all`}
            >
              {loading ? "Booking..." : "Confirm Booking"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
