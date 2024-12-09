const express = require('express')
const router = express.Router()
const Room = require('../models/Room');

router.get('/rooms', async (req, res) => {
  try {
  const rooms = await Room.find();
  res.json(rooms);
  } catch(error) {
    res.status(500).send('Error fetching rooms')
  };
});

router.post('/', async (req, res) => {

  const newRoom = new Room(req.body);
  await newRoom.save();
})

module.exports = router;