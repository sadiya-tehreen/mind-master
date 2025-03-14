// src/components/ScenarioVisualization.js
// import React from 'react';

// function ScenarioVisualization() {
//   return (
//     <div className="p-8 max-w-md mx-auto bg-white rounded-lg shadow-md text-center">
//       <h2 className="text-2xl font-bold mb-4">Relaxation Scenario</h2>
//       <p>Imagine yourself in a peaceful, calming environment...</p>
//     </div>
//   );
// }

// export default ScenarioVisualization;

import React, { useState } from 'react';
import './RelaxationScenarios.css';

const RelaxationScenarios = ({ userMood, weather }) => {
  const [selectedContent, setSelectedContent] = useState("");

  // Sample content for each category
  const podcasts = ["Relaxing Music Playlist", "Motivational Talks", "Self-Help Podcasts"];
  const meditations = ["Guided Meditation for Stress Relief", "Deep Breathing Exercises", "Mindfulness Meditation"];
  const stretches = ["Neck and Shoulder Stretches", "10-min Full Body Stretch", "Morning Yoga Routine"];

  // Smart content selection based on user mood and weather
  const getSmartContent = () => {
    if (userMood === "Stressed") {
      return {
        podcasts: podcasts[1],
        meditations: meditations[0],
        stretches: stretches[0]
      };
    }
    if (userMood === "Happy") {
      return {
        podcasts: podcasts[0],
        meditations: meditations[2],
        stretches: stretches[1]
      };
    }
    if (weather === "Rainy") {
      return {
        podcasts: podcasts[2],
        meditations: meditations[1],
        stretches: stretches[2]
      };
    }
    return {
      podcasts: podcasts[0],
      meditations: meditations[0],
      stretches: stretches[1]
    };
  };

  const { podcasts: selectedPodcast, meditations: selectedMeditation, stretches: selectedStretch } = getSmartContent();

  return (
    <div className="relaxation-container">
      <h2 className="relaxation-title">Relaxation Scenarios</h2>

      <div className="relaxation-flex-container">
        {/* Podcasts/Playlists */}
        <div className="relaxation-card">
          <h3>Podcasts/Playlists</h3>
          <p>{selectedPodcast}</p>
          <button onClick={() => setSelectedContent(selectedPodcast)}>Play</button>
        </div>

        {/* Meditation */}
        <div className="relaxation-card">
          <h3>Meditation</h3>
          <p>{selectedMeditation}</p>
          <button onClick={() => setSelectedContent(selectedMeditation)}>Start Meditation</button>
        </div>

        {/* Stretches/Physical Exercise */}
        <div className="relaxation-card">
          <h3>Stretches</h3>
          <p>{selectedStretch}</p>
          <button onClick={() => setSelectedContent(selectedStretch)}>Start Exercise</button>
        </div>
      </div>

      {/* Display selected content */}
      {selectedContent && (
        <div className="selected-content">
          <h4>Now Playing/Doing:</h4>
          <p>{selectedContent}</p>
        </div>
      )}
    </div>
  );
};

export default RelaxationScenarios;

