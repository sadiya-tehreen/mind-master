const jwt = require('jsonwebtoken');
const CheckIn = require('../models/CheckIn');
const User = require('../models/User');

// Function to save a new check-in
exports.saveCheckIn = async (req, res) => {
  try {
    // Extract the token from the Authorization header
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized. No token provided.' });
    }

    // Verify the token and decode it
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey'); // Use your secret key

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
};