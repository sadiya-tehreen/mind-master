// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5001/api/auth';

// Register User
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// Login User
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Save Check-In
export const saveCheckIn = async (checkInData) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await axios.post('http://localhost:5001/api/checkin', checkInData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error saving check-in:', error);
    throw error;
  }
};

const api = {
  registerUser,
  loginUser,
  saveCheckIn,
};

export default api;