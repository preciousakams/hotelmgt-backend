const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
});

const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;
