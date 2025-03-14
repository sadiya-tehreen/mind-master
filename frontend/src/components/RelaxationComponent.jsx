// RelaxationComponent.jsx
import { useState } from 'react';

const RelaxationComponent = () => {
    const [activity, setActivity] = useState('');
  
    const getRandomActivity = () => {
      const activities = ['Meditation', 'Breathing Exercise', 'Yoga', 'Stretching'];
      setActivity(activities[Math.floor(Math.random() * activities.length)]);
    };
  
    return (
      <div className="bg-blue-100 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Need a Relaxation Break?</h2>
        <button 
          className="bg-green-500 text-white py-2 px-4 rounded-md"
          onClick={getRandomActivity}
        >
          Start Relaxation Activity
        </button>
        {activity && <p className="mt-4 text-xl">{`Try: ${activity}`}</p>}
      </div>
    );
  };
  
  export default RelaxationComponent;