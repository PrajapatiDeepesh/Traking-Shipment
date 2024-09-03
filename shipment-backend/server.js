// backend.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;
const MONGO_URI = 'mongodb://localhost:27017/data'; // Replace with your MongoDB connection string

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Define a schema and model for your data
const shipmentSchema = new mongoose.Schema({
  senderName: String,
  senderAddress: String,
  receiverName: String,
  receiverAddress: String,
  shipmentDetails: String,
  trackId: String
});

const Shipment = mongoose.model('Shipment', shipmentSchema);

// Define routes
app.post('/api/shipments', async (req, res) => {
  try {
    const newShipment = new Shipment(req.body);
    await newShipment.save();
    res.status(201).json(newShipment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/shipments', async (req, res) => {
  try {
    const shipments = await Shipment.find();
    res.status(200).json(shipments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
