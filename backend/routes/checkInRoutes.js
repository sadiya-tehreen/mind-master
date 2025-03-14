const express = require('express');
const router = express.Router();
const CheckIn = require('../models/CheckIn');
const jwt = require('jsonwebtoken'); // Add this line for JWT decoding
const User = require('../models/User'); // Assuming you have a User model
require('dotenv').config();

// Endpoint to save check-in data
router.post('/checkin', async (req, res) => {
  try {
    // Extract the token from the headers
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized. No token provided.' });
    }

    // Verify the token and decode it
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your secret key here
    
    // Fetch the user using the decoded user ID
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized. User not found.' });
    }

    // Extract data from the request body
    const { mood, energy, stress, selectedEmotions, reflection } = req.body;

    // Create a new check-in entry
    const newCheckIn = new CheckIn({
      userId: user._id, // Use the authenticated user's ID
      mood,
      energy,
      stress,
      selectedEmotions,
      reflection,
    });

    // Save the check-in entry to MongoDB
    await newCheckIn.save();
    res.status(201).json({ message: 'Check-in saved successfully.' });
  } catch (error) {
    console.error('Error saving check-in:', error);
    res.status(500).json({ message: 'Failed to save check-in.' });
  }
});

module.exports = router;
