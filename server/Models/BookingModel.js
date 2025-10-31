import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  experienceId: String,
  userName: String,
  email: String,
 slot: 
    {
      date: String,
      time: String,
       
    },
  
  totalPrice: Number,
  promoCode: String,
  success: Boolean,
});

const BookingModel = mongoose.model('Booking', bookingSchema);
export default BookingModel
