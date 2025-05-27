import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';

const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const dbName = 'horsesavvy'; // You can use any db name

// Create a new booking
app.post('/api/bookings', async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const bookings = db.collection('bookings');
    const result = await bookings.insertOne(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all bookings (for admin)
app.get('/api/bookings', async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const bookings = db.collection('bookings');
    const allBookings = await bookings.find().toArray();
    res.json(allBookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a booking by reference (for confirmation page)
app.get('/api/bookings/:reference', async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const bookings = db.collection('bookings');
    const booking = await bookings.findOne({ reference: req.params.reference });
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API server running on port ${port}`)); 