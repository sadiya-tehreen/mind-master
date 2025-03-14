// src/components/EcoConsciousSuggestions.js
import React from "react";

function EcoConsciousSuggestions() {
  const tips = [
    "Turn off lights when not in use.",
    "Use reusable water bottles instead of plastic.",
    "Opt for walking or cycling for short distances.",
  ];

  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold text-teal-600 mb-4">
        Eco-Conscious Tips
      </h1>
      <ul className="text-left">
        {tips.map((tip, index) => (
          <li key={index} className="mb-2 text-gray-700">
            🌱 {tip}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EcoConsciousSuggestions;