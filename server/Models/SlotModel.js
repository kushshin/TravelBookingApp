import mongoose from 'mongoose';
const slotSchema = new mongoose.Schema({
experienceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Experience' },
start: Date,
end: Date,
capacity: Number,
remaining: Number,
}, { timestamps: true });
const SlotModel = mongoose.model('Slot', slotSchema);
export default SlotModel