const express = require('express')
const router = express.Router()
const Room = require('../models/Room');

router.get('/', async (req, res) => {
  try {
  const rooms = await Room.find();
  res.json(rooms);
  } catch(error) {
    res.status(500).send('Error fetching rooms')
  };
});
// get room by id
router.get('/:id', async(req,res) => {

  try {
    const room = await Room.findById(req.params.id);
    if(!room) return res.status(404).json({error: 'Room not found'})
      res.json(room);
  } catch (error) {
    res.status(500).json({error: 'server error'})
  }
})
// create room
router.post('/', async (req, res) => {

  try{
    const newRoom = new Room(req.body);
    await newRoom.save();
    res.status(201).json(room)
  }catch(error) {
    res.status(201).json({error: 'invalid data'})
  }
})

//update a room by id
router.put('/:id', async (req, res) => {
  try{
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if(!room) return res.status(404).json({error: 'Room not found'});
    res.json(room)
  } catch (error) {
    res.status(400).json({error: 'Invalid data'})
  }
})
//delete room by id
router.delete('/:id', async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) return res.status(404).json({ error: 'Room not found' });
    res.json({ message: 'Room deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});


module.exports = router;