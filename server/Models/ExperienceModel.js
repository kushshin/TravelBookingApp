
import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
  available: { type: Number, default: 1 },
});

const experienceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  image: String,
  price: { type: Number, required: true },
  slots: [slotSchema],
});


const ExperienceModel = mongoose.models.Experience || mongoose.model("Experience", experienceSchema);

export default ExperienceModel;
