const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  name: String,
  type: String,
  price: Number,
  image: String,
  description: String,
  availability: Boolean,
});

module.exports = mongoose.model('Room', RoomSchema);
