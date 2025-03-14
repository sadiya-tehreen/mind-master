// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {

    console.log('Registering user with email:', email); // Add this line to trace the input
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = await User.create({ email, password: hashedPassword });

    console.log('User registered:', newUser); // Log successful user creation
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during user registration:', error); // Log the full error
    res.status(500).json({ message: 'Server error', error });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {

    console.log('Logging in user with email:', email); // Add this line to trace the input

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: 'Invalid password' });

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error('Error logging in:', error.response.data.message); // Print detailed error message
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { loginUser, registerUser };