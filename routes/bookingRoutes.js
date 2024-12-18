const express = require('express');
const Booking = require('../models/booking');
const Room = require('../models/Room');
const router = express.Router();

// Create a new booking
router.post('/', async (req, res) => {
  try {
    const { roomId, customerName, email, checkIn, checkOut, totalPrice } = req.body;

    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ error: 'Room not found' });
    console.log(req.body)
    const booking = new Booking({
      roomId,
      customerName,
      email,
      checkIn,
      checkOut,
      totalPrice,
    });
   
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ error: 'Invalid booking data' });
  }
});

module.exports = router;
