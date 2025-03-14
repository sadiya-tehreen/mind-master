// CheckInComponent.jsx
import { useState } from 'react';

const CheckInComponent = () => {
  const [mood, setMood] = useState('');
  const [energy, setEnergy] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle storing the responses or sending to backend
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">How are you feeling today?</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">Mood:</label>
        <input 
          type="text" 
          className="border p-2 rounded-md w-full mb-4"
          value={mood} 
          onChange={(e) => setMood(e.target.value)} 
          placeholder="Describe your mood" 
        />
        <label className="block mb-2">Energy Level:</label>
        <input 
          type="text" 
          className="border p-2 rounded-md w-full"
          value={energy} 
          onChange={(e) => setEnergy(e.target.value)} 
          placeholder="How energetic are you?" 
        />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CheckInComponent;