// // src/components/GratitudeJar.js
// import React, { useState } from 'react';

// function GratitudeJar() {
//   const [entry, setEntry] = useState('');
//   const [entries, setEntries] = useState([]);

//   const handleAddEntry = () => {
//     setEntries([...entries, entry]);
//     setEntry('');
//   };

//   return (
//     <div className="p-8 bg-gradient-to-r from-indigo-200 via-blue-100 to-pink-200 rounded shadow-md">
//       <h2 className="text-2xl font-bold mb-4 text-center">Gratitude Jar</h2>
//       <input
//         type="text"
//         value={entry}
//         onChange={(e) => setEntry(e.target.value)}
//         className="w-full border p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
//         placeholder="What are you grateful for today?"
//       />
//       <button
//         onClick={handleAddEntry}
//         className="bg-blue-600 text-white py-2 px-4 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
//       >
//         Add Entry
//       </button>

//       <div className="mt-6 space-y-4">
//         {entries.map((entry, index) => (
//           <div key={index} className="p-4 bg-white rounded shadow-md">
//             <p>{entry}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default GratitudeJar;


// src/components/GratitudeJar.js
// import React, { useState } from 'react';

// const GratitudeJar = () => {
//   const [gratitude, setGratitude] = useState('');

//   const handleGratitudeSubmission = (e) => {
//     e.preventDefault();
//     // Save the gratitude (e.g., API call)
//     console.log('Gratitude submitted:', gratitude);
//     setGratitude('');
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
//       <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Gratitude Jar</h2>
//       <form onSubmit={handleGratitudeSubmission}>
//         <textarea
//           value={gratitude}
//           onChange={(e) => setGratitude(e.target.value)}
//           className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
//           placeholder="What are you grateful for today?"
//           rows="4"
//         />
//         <button type="submit" className="w-full py-3 bg-yellow-600 text-white rounded hover:bg-yellow-700">
//           Add Gratitude
//         </button>
//       </form>
//     </div>
//   );
// };

// export default GratitudeJar;

import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { motion } from 'framer-motion';
import './GratitudeJar.css'; // Ensure this file exists and is properly linked

const GratitudeJar = () => {
  const [gratitude, setGratitude] = useState('');
  const [entries, setEntries] = useState([]);
  const [isLidOpen, setIsLidOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(null); // To keep track of which entry is being edited
  const [editingText, setEditingText] = useState('');

  const { transcript, resetTranscript, listening } = useSpeechRecognition();

  // Handle gratitude submission (either typed or from speech)
  const handleGratitudeSubmission = (e) => {
    e.preventDefault();
    const newGratitude = gratitude || transcript;

    if (isEditing !== null) {
      // Edit the existing gratitude entry
      const updatedEntries = [...entries];
      updatedEntries[isEditing] = editingText;
      setEntries(updatedEntries);
      setIsEditing(null);
      setEditingText('');
    } else {
      // Add new gratitude entry
      setEntries([...entries, newGratitude]);
    }

    setGratitude('');
    resetTranscript();
    setIsLidOpen(true); // Open the jar lid and trigger animation
  };

  // Handle voice input
  const handleVoiceInput = () => {
    SpeechRecognition.startListening();
  };

  // Handle removing an entry
  const handleRemoveEntry = (index) => {
    const updatedEntries = entries.filter((_, idx) => idx !== index);
    setEntries(updatedEntries);
  };

  // Handle editing an entry
  const handleEditEntry = (index) => {
    setIsEditing(index);
    setEditingText(entries[index]);
  };

  // Toggle jar visibility
  const toggleJarVisibility = () => {
    setIsLidOpen(!isLidOpen);
  };

  return (
    <div className="container">
      <h2 className="title">Gratitude Jar</h2>

      {/* Jar container */}
      <div className="jar-container">
        <div className="jar-lid">
          {isLidOpen && (
            <motion.div className="effects-container">
              {/* Random particle animation */}
              {[...Array(10)].map((_, idx) => (
                <motion.div
                  key={idx}
                  className="particle"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 0.5}s`,
                    animationDuration: `${Math.random() * 2 + 1}s`,
                  }}
                />
              ))}
            </motion.div>
          )}
        </div>

        <div className="jar-body">
          {/* Button to toggle the visibility of the jar */}
          <button className="toggle-jar-btn" onClick={toggleJarVisibility}>
            {isLidOpen ? 'Close Jar' : 'Open Jar'}
          </button>

          {/* Display gratitude entries */}
          {isLidOpen && entries.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {entries.map((entry, index) => (
                <div key={index} className="entry-card">
                  <p>{entry}</p>
                  <button onClick={() => handleEditEntry(index)} className="edit-btn">
                    Edit
                  </button>
                  <button onClick={() => handleRemoveEntry(index)} className="remove-btn">
                    Remove
                  </button>
                </div>
              ))}
            </motion.div>
          ) : (
            <p className="placeholder-text">The jar is empty. Add some gratitude!</p>
          )}
        </div>
      </div>

      {/* Text input and voice input controls */}
      <form onSubmit={handleGratitudeSubmission}>
        <textarea
          value={isEditing !== null ? editingText : gratitude}
          onChange={(e) => (isEditing !== null ? setEditingText(e.target.value) : setGratitude(e.target.value))}
          className="input-textarea"
          placeholder="What are you grateful for today?"
        />

        <div className="controls">
          {/* Voice input button */}
          <button
            type="button"
            className="record-btn"
            onClick={handleVoiceInput}
            disabled={listening}
          >
            {listening ? 'Listening...' : 'Speak Gratitude'}
          </button>

          {/* Submit button */}
          <button type="submit" className="submit-btn">
            {isEditing !== null ? 'Save Changes' : 'Add Gratitude'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GratitudeJar;


