import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { experienceId, date, time, quantity, price, experience } = state || {};
  const [form, setForm] = useState({ name: "", email: "" });
  const [promoCode, setPromoCode] = useState("");
  const [discountMsg, setDiscountMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [finalPrice, setFinalPrice] = useState(price || experience?.price || 0);

  if (!experienceId || !date || !time) {
    return (
      <div className="p-6 text-center text-red-500">
        No experience selected.
      </div>
    );
  }

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleValidatePromo = async () => {
    try {
      if (promoCode === "SAVE10") {
        setFinalPrice((prev) => prev * 0.9);
        setDiscountMsg(" SAVE10 applied (10% off)");
      } else if (promoCode === "FLAT100") {
        setFinalPrice((prev) => prev - 100);
        setDiscountMsg("FLAT100 applied (₹100 off)");
      } else {
        setDiscountMsg("Invalid promo code");
      }
    } catch (err) {
      setDiscountMsg("Error validating promo");
    }
  };

  const handleBooking = async () => {
    if (!form.name || !form.email) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3001/api/bookings", {
        experienceId: experience._id,
        userName: form.name,
        email: form.email,
        slot: { date, time },
        totalPrice: finalPrice,
        promoCode,
        quantity,
        success: true,
      });

      navigate("/result", {
        state: { booking: res.data.booking, success: true },
      });
    } catch (err) {
      console.error("Booking failed:", err);
      navigate("/result", { state: { success: false } });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <div className="w-full max-w-5xl bg-white shadow-md rounded-lg flex flex-col md:flex-row p-6 md:p-10">
       
        <div className="w-full md:w-2/3 md:pr-8 border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <span className="text-gray-600 cursor-pointer">&#8592;</span> Checkout
          </h2>

        
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleInput}
                placeholder="Full name"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-yellow-300"
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleInput}
                placeholder="Email"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-yellow-300"
              />
            </div>

            <div className="flex gap-3">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Promo code"
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-yellow-300"
              />
              <button
                onClick={handleValidatePromo}
                className="bg-black text-white px-5 py-2 rounded-md hover:bg-gray-800 transition"
              >
                Apply
              </button>
            </div>

            {discountMsg && (
              <p
                className={`text-sm ${
                  discountMsg.startsWith("✅")
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {discountMsg}
              </p>
            )}

            <div className="flex items-center gap-2 mt-3">
              <input type="checkbox" className="h-4 w-4 border-gray-300" />
              <span className="text-sm text-gray-600">
                I agree to the terms and safety policy
              </span>
            </div>
          </div>
        </div>

       
        <div className="w-full md:w-1/3 mt-8 md:mt-0 bg-gray-50 border border-gray-200 rounded-lg p-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Experience
          </h3>
          <div className="text-gray-700 space-y-1 text-sm">
            <p>
              <span className="font-medium">Activity:</span> {experience.title}
            </p>
            <p>
              <span className="font-medium">Date:</span> {date}
            </p>
            <p>
              <span className="font-medium">Time:</span> {time}
            </p>
            <p>
              <span className="font-medium">Qty:</span> {quantity}
            </p>
            <hr className="my-2" />
            <p className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{experience.price}</span>
            </p>
            <p className="flex justify-between">
              <span>Taxes</span>
              <span>₹59</span>
            </p>
            <hr className="my-2" />
            <p className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>₹{finalPrice}</span>
            </p>
          </div>

          <button
            onClick={handleBooking}
            disabled={loading}
            className="w-full bg-yellow-400 text-gray-900 font-semibold mt-5 py-2 rounded-md hover:bg-yellow-500 transition"
          >
            {loading ? "Processing..." : "Pay and Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
