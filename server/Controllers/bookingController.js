
import BookingModel from '../Models/BookingModel.js'
import ExperienceModel from "../Models/ExperienceModel.js";

export const createBooking = async (req, res) => {
 
  try {
    const { experienceId, userName, email, slot, promoCode, quantity } = req.body;
    const experience = await ExperienceModel.findById(experienceId);
    if (!experience) return res.status(404).json({ message: "Experience not found" });

   
    if (!Array.isArray(experience.slots)) {
      return res.status(400).json({ message: "Invalid slots data format" });
    }

   
    
    const slotFound = experience.slots.find(
      (s) => s.date === slot.date && s.time === slot.time && s.available
    );

    if (!slotFound || slotFound.available <= 0) {
      return res.status(400).json({ message: "Slot not available" });
    }

   
    let totalPrice = experience.price * quantity;
    if (promoCode === "SAVE10") totalPrice *= 0.9;
    else if (promoCode === "FLAT100") totalPrice -= 100;

   
    const booking = new BookingModel({
      experienceId,
      userName,
      email,
      slot ,
      quantity,
      totalPrice,
      promoCode,
      success: true,
    });
      console.log({be:booking})
   
    slotFound.available -= 1;
    await booking.save();

    
    res.status(201).json({
      message: "Booking successful!",
      booking,
    });
  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({ message: error.message });
  }
};
