const mongoose = require('mongoose');
const {faker} = require('@faker-js/faker')
require('dotenv').config()

const Room = require('../models/Room')

// mongodb connection

mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('connected to momgodb'))
    .catch((err) => console.error('Error connecting to mongodb', err))

    // generate random room data
    const generateRooms = (count) => {
      const roomTypes = ['Single', 'Double', 'Suite', 'Deluxe Suite'];
      const images = [
        'https://res.cloudinary.com/wonderwoman/image/upload/v1733604781/myportfolio/wonderHotels/single.jpg',
        'https://res.cloudinary.com/wonderwoman/image/upload/v1733604777/myportfolio/wonderHotels/double.jpg',
        'https://res.cloudinary.com/wonderwoman/image/upload/v1733604788/myportfolio/wonderHotels/suite.jpg',
        'https://res.cloudinary.com/wonderwoman/image/upload/v1733604781/myportfolio/wonderHotels/deluxe-suite.jpg',
      ];
    
      const rooms = [];
      for (let i = 0; i < count; i++) {
        rooms.push({
          name: `${faker.internet.username()}`,
          price: faker.number.int({ min: 50, max: 500 }),
          type: roomTypes[Math.floor(Math.random() * roomTypes.length)],
          image: images[Math.floor(Math.random() * images.length)],
          description: faker.lorem.sentences(2),
          availability: faker.datatype.boolean(),
        });
      }
      return rooms;
    };
    
    // Save generated rooms to the database
    const seedDatabase = async () => {
      const rooms = generateRooms(20); // Generate 10 rooms
      try {
        await Room.deleteMany(); // Clear existing data
        await Room.insertMany(rooms); // Insert new data
        console.log('Test data generated successfully!');
      } catch (error) {
        console.error('Error seeding database:', error);
      } finally {
        mongoose.connection.close();
      }
    };
    
    // Run the script
    seedDatabase();