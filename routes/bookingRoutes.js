const express = require('express');
const Booking = require('../models/booking');
const Room = require('../models/Room');
const router = express.Router();

// Create a new booking
router.post('/', async (req, res) => {
  try {
    const { roomId, customerName, email, checkIn, checkOut, totalPrice } = req.body;

    // Check if the room exists and is available
    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ error: 'Room not found' });
    if (!room.availability) return res.status(400).json({ error: 'Room is already booked' });

    // Create a new booking
    const booking = new Booking({
      roomId,
      customerName,
      email,
      checkIn,
      checkOut,
      totalPrice,
    });

    await booking.save();

    // Mark the room as unavailable
    room.availability = false;
    await room.save();

    res.status(201).json(booking);
  } catch (error) {
    console.error('Error creating booking:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
