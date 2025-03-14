// // src/components/CheckIn.js
// import React, { useState } from 'react';
// import axios from 'axios';

// function CheckIn() {
//   const [mood, setMood] = useState(null);
//   const [energy, setEnergy] = useState(null);
//   const [stress, setStress] = useState(null);
//   const [selectedEmotions, setSelectedEmotions] = useState([]);
//   const [reflection, setReflection] = useState('');
//   const [response, setResponse] = useState('');

//   const emojiMap = {
//     mood: ['😔', '😐', '🙂', '😁', '😄'],
//     energy: ['😴', '😐', '🙂', '💪', '⚡'],
//     stress: ['😩', '😞', '😐', '🙂', '😎'],
//   };

//   const emotions = ['Stressed', 'Relaxed', 'Hopeful', 'Anxious', 'Happy', 'Sad', 'Excited'];

//   const handleEmotionChange = (e) => {
//     const value = e.target.value;
//     setSelectedEmotions((prev) =>
//       prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
//     );
//   };

//   const handleReflectionChange = (e) => setReflection(e.target.value);

//   const generateResponse = () => {
//     let responseMessage = '';

//     // Mood-based response
//     if (mood === 0) {
//       responseMessage = 'You seem a bit down. Remember, tough times don’t last, but tough people do. 💪';
//     } else if (mood === 4) {
//       responseMessage = 'You seem to be in high spirits! Keep riding that positive wave. 🌊😄';
//     } else {
//       responseMessage = 'You’re somewhere in the middle! Take a break if you need to recharge. ⚡';
//     }

//     // Energy-based response
//     if (energy === 0) {
//       responseMessage += ' It looks like you’re feeling tired. Make sure to rest and rejuvenate. 💤';
//     } else if (energy === 4) {
//       responseMessage += ' Wow! Full of energy! Make the most of it and keep up the great work. ⚡';
//     }

//     // Stress-based response
//     if (stress === 0) {
//       responseMessage += ' It seems like stress is on your mind. Try some relaxation techniques to unwind. 😌';
//     } else if (stress === 4) {
//       responseMessage += ' You’re feeling relaxed and stress-free—keep this peaceful vibe going! 😎';
//     }

//     // Emotion-based response
//     if (selectedEmotions.includes('Stressed')) {
//       responseMessage += ' You might be feeling stressed. Try to focus on deep breathing exercises. 🌿';
//     }
//     if (selectedEmotions.includes('Happy')) {
//       responseMessage += ' It’s amazing to see you happy! Keep embracing the positive energy. ✨';
//     }

//     return responseMessage;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const checkInData = {
//       mood,
//       energy,
//       stress,
//       selectedEmotions,
//       reflection,
//     };
  
//     try {
//       // Assuming the user is authenticated and you have a token stored
//       const token = localStorage.getItem('authToken');
//       await axios.post('http://localhost:5001/api/checkin', checkInData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });
  
//       setResponse(generateResponse());
//     } catch (error) {
//       console.error('Error saving check-in:', error);
//       alert('Failed to save your check-in.');
//     }
//   };

//   return (
//     <div className="p-8 max-w-xl mx-auto bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg">
//       <h2 className="text-4xl font-bold mb-6 text-center">Daily Check-In</h2>
      
//       {/* Check-In Form */}
//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Mood Selection */}
//         <div>
//           <label className="block text-lg mb-2">How are you feeling today?</label>
//           <div className="flex justify-between">
//             {emojiMap.mood.map((emoji, index) => (
//               <button
//                 key={index}
//                 type="button"
//                 onClick={() => setMood(index)}
//                 className={`text-5xl p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
//                   mood === index
//                     ? 'bg-blue-500 text-white'
//                     : 'bg-transparent text-gray-300 hover:bg-blue-700'
//                 }`}
//               >
//                 {emoji}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Energy Level */}
//         <div>
//           <label className="block text-lg mb-2">How energetic do you feel?</label>
//           <div className="flex justify-between">
//             {emojiMap.energy.map((emoji, index) => (
//               <button
//                 key={index}
//                 type="button"
//                 onClick={() => setEnergy(index)}
//                 className={`text-5xl p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
//                   energy === index
//                     ? 'bg-blue-500 text-white'
//                     : 'bg-transparent text-gray-300 hover:bg-blue-700'
//                 }`}
//               >
//                 {emoji}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Stress Level */}
//         <div>
//           <label className="block text-lg mb-2">How stressed are you?</label>
//           <div className="flex justify-between">
//             {emojiMap.stress.map((emoji, index) => (
//               <button
//                 key={index}
//                 type="button"
//                 onClick={() => setStress(index)}
//                 className={`text-5xl p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
//                   stress === index
//                     ? 'bg-blue-500 text-white'
//                     : 'bg-transparent text-gray-300 hover:bg-blue-700'
//                 }`}
//               >
//                 {emoji}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Emotion Word Cloud */}
//         <div>
//           <label className="block text-lg mb-2">Select your emotions</label>
//           <div className="flex flex-wrap gap-3">
//             {emotions.map((emotion) => (
//               <label key={emotion} className="inline-block">
//                 <input
//                   type="checkbox"
//                   value={emotion}
//                   onChange={handleEmotionChange}
//                   className="mr-2 leading-tight"
//                 />
//                 <span className="text-lg">{emotion}</span>
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Daily Reflection */}
//         <div>
//           <label className="block text-lg mb-2">Daily Reflection</label>
//           <textarea
//             value={reflection}
//             onChange={handleReflectionChange}
//             className="w-full p-4 border-2 border-blue-500 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="What's on your mind today?"
//             style={{ color: 'black' }}
//           ></textarea>
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded mt-4 transition duration-300"
//         >
//           Submit Check-In
//         </button>
//       </form>

//       {/* Response Section */}
//       {response && (
//         <div className="mt-8 text-lg bg-gray-800 p-4 rounded-lg shadow-md">
//           <h3 className="font-bold text-xl mb-2">Your Check-In Response:</h3>
//           <p className="text-white">{response}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default CheckIn;
import React, { useState } from 'react';

function CheckIn() {
  const [mood, setMood] = useState(null);
  const [energy, setEnergy] = useState(null);
  const [stress, setStress] = useState(null);
  const [selectedEmotions, setSelectedEmotions] = useState([]);
  const [reflection, setReflection] = useState('');
  const [response, setResponse] = useState('');
  const [recommendations, setRecommendations] = useState('');

  const emojiMap = {
    mood: ['😔', '😐', '🙂', '😁', '😄'],
    energy: ['😴', '😐', '🙂', '💪', '⚡'],
    stress: ['😩', '😞', '😐', '🙂', '😎'],
  };

  const emotions = ['Stressed', 'Relaxed', 'Hopeful', 'Anxious', 'Happy', 'Sad', 'Excited'];

  const handleEmotionChange = (e) => {
    const value = e.target.value;
    setSelectedEmotions((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const handleReflectionChange = (e) => setReflection(e.target.value);

  const generateResponse = () => {
    // Validate that mood, energy, and stress are set
    if (mood === null || energy === null || stress === null) {
      return { responseMessage: 'Please make sure to select all mood, energy, and stress levels before submitting.', recommendationMessage: '' };
    }

    let responseMessage = '';
    let recommendationMessage = '';

    // Mood-based response
    if (mood === 0) {
      responseMessage = 'You seem a bit down. Remember, tough times don’t last, but tough people do. 💪';
    } else if (mood === 4) {
      responseMessage = 'You seem to be in high spirits! Keep riding that positive wave. 🌊😄';
    } else {
      responseMessage = 'You’re somewhere in the middle! Take a break if you need to recharge. ⚡';
    }

    // Energy-based response
    if (energy === 0) {
      responseMessage += ' It looks like you’re feeling tired. Make sure to rest and rejuvenate. 💤';
    } else if (energy === 4) {
      responseMessage += ' Wow! Full of energy! Make the most of it and keep up the great work. ⚡';
    }

    // Stress-based response
    if (stress === 0) {
      responseMessage += ' It seems like stress is on your mind. Try some relaxation techniques to unwind. 😌';
    } else if (stress === 4) {
      responseMessage += ' You’re feeling relaxed and stress-free—keep this peaceful vibe going! 😎';
    }

    if (selectedEmotions.includes('Stressed')) {
      recommendationMessage += ' You might be feeling stressed. Try to focus on deep breathing exercises. 🌿 ';
      recommendationMessage += 'Consider planting a tree or spending time in nature to relax and refresh. 🌱';
    }
    if (selectedEmotions.includes('Happy')) {
      recommendationMessage += ' It’s amazing to see you happy! Keep embracing the positive energy. ✨ ';
      recommendationMessage += 'Why not spread your joy by helping a friend or planting a garden to bring happiness to nature too? 🌻';
    }
    if (selectedEmotions.includes('Relaxed')) {
      recommendationMessage += ' You’re feeling calm—enjoy the peace! 🌿 ';
      recommendationMessage += 'Take a walk in the park or consider a picnic outside to connect with nature. 🌳';
    }
    if (selectedEmotions.includes('Anxious')) {
      recommendationMessage += ' Feeling anxious? Try some grounding exercises to ease your mind. 🌸 ';
      recommendationMessage += 'If you have access to a garden, take a moment to touch the earth—it can be soothing. 🌍';
    }
    if (selectedEmotions.includes('Hopeful')) {
      recommendationMessage += ' You’re feeling hopeful—keep that positive mindset! 🌟 ';
      recommendationMessage += 'Why not start a new eco-friendly habit, like reducing plastic use or recycling more? 🌍';
    }
    if (selectedEmotions.includes('Sad')) {
      recommendationMessage += ' Feeling sad? It’s okay to feel that way. Take your time to process it. 💧 ';
      recommendationMessage += 'Consider taking a walk in nature to lift your spirits—being around plants can help. 🌿';
    }
    if (selectedEmotions.includes('Excited')) {
      recommendationMessage += ' You’re feeling excited—what a great vibe! Keep that energy flowing. ⚡ ';
      recommendationMessage += 'Why not channel that excitement into something productive, like planting a tree or starting a new project? 🌱';
    }
    
    // Combine response and recommendations
    return { responseMessage, recommendationMessage };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { responseMessage, recommendationMessage } = generateResponse();
    setResponse(responseMessage); // Set the response message
    setRecommendations(recommendationMessage); // Set the recommendation message
  };

  return (
    <div className="p-8 max-w-xl mx-auto bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg">
      <h2 className="text-4xl font-bold mb-6 text-center">Daily Check-In</h2>

      {/* Check-In Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Mood Selection */}
        <div>
          <label className="block text-lg mb-2">How are you feeling today?</label>
          <div className="flex justify-between">
            {emojiMap.mood.map((emoji, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setMood(index)}
                className={`text-5xl p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${mood === index ? 'bg-blue-500 text-white' : 'bg-transparent text-gray-300 hover:bg-blue-700'}`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Energy Level */}
        <div>
          <label className="block text-lg mb-2">How energetic do you feel?</label>
          <div className="flex justify-between">
            {emojiMap.energy.map((emoji, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setEnergy(index)}
                className={`text-5xl p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${energy === index ? 'bg-blue-500 text-white' : 'bg-transparent text-gray-300 hover:bg-blue-700'}`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Stress Level */}
        <div>
          <label className="block text-lg mb-2">How stressed are you?</label>
          <div className="flex justify-between">
            {emojiMap.stress.map((emoji, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setStress(index)}
                className={`text-5xl p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${stress === index ? 'bg-blue-500 text-white' : 'bg-transparent text-gray-300 hover:bg-blue-700'}`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Emotion Word Cloud */}
        <div>
          <label className="block text-lg mb-2">Select your emotions</label>
          <div className="flex flex-wrap gap-3">
            {emotions.map((emotion) => (
              <label key={emotion} className="inline-block">
                <input
                  type="checkbox"
                  value={emotion}
                  onChange={handleEmotionChange}
                  className="mr-2 leading-tight"
                />
                <span className="text-lg">{emotion}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Daily Reflection */}
        <div>
          <label className="block text-lg mb-2">Daily Reflection</label>
          <textarea
            value={reflection}
            onChange={handleReflectionChange}
            className="w-full p-4 border-2 border-blue-500 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="What's on your mind today?"
            style={{ color: 'black' }}
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded mt-4 transition duration-300"
        >
          Submit Check-In
        </button>
      </form>

      {/* Response Section */}
      {response && (
        <div className="mt-8 text-lg bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="font-bold text-xl mb-2">Your Check-In Response:</h3>
          <p className="text-white">{response}</p>
        </div>
      )}

      {/* Recommendations Section */}
      {recommendations && (
        <div className="mt-4 text-lg bg-green-800 p-4 rounded-lg shadow-md">
          <h3 className="font-bold text-xl mb-2">Personalized Recommendations:</h3>
          <p className="text-white">{recommendations}</p>
        </div>
      )}
    </div>
  );
}

export default CheckIn;
