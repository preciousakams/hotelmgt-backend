const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
// app.use(express.json());

// app.use('/api/rooms', require('./routes/roomRoutes'));
app.get('/test', (req,res) => {
  res.status((200).json('deployment is working'))
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;