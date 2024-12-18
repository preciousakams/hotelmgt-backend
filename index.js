const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const roomRoutes = require('./routes/roomRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

dotenv.config();
connectDB();

const app = express();
//middleware
app.use(cors());
app.use(express.json())

// routes
app.use('/rooms', roomRoutes);
app.use('/bookings', bookingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));