// // src/components/Dashboard.js
// import React from 'react';
// import { Link } from 'react-router-dom';

// function Dashboard() {
//   return (
//     <div className="p-8 text-center">
//       <h1 className="text-3xl font-bold text-blue-600 mb-6">Welcome to MindFlow</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         <Link to="/checkin" className="block bg-blue-100 hover:bg-blue-200 p-6 rounded-lg shadow-md">
//           <h2 className="text-lg font-semibold">Daily Check-In</h2>
//           <p>Log your mood, energy, and stress levels</p>
//         </Link>
//         <Link to="/gratitude" className="block bg-green-100 hover:bg-green-200 p-6 rounded-lg shadow-md">
//           <h2 className="text-lg font-semibold">Gratitude Jar</h2>
//           <p>Store your achievements and positive moments</p>
//         </Link>
//         <Link to="/scenario" className="block bg-yellow-100 hover:bg-yellow-200 p-6 rounded-lg shadow-md">
//           <h2 className="text-lg font-semibold">Relaxation Scenario</h2>
//           <p>Enter a calming visualization to reduce stress</p>
//         </Link>
//         <Link to="/journey" className="block bg-purple-100 hover:bg-purple-200 p-6 rounded-lg shadow-md">
//           <h2 className="text-lg font-semibold">Mindfulness Journey</h2>
//           <p>Follow a personalized wellness journey</p>
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Dashboard() {
  const cardData = [
    { to: "/checkin", color: "blue", title: "Daily Check-In" },
    { to: "/gratitude", color: "green", title: "Gratitude Jar" },
    { to: "/scenario", color: "yellow", title: "Relaxation Scenario" },
    
    { to: "/personalization", color: "pink", title: "AI Personalization" },
    { to: "/eco-tips", color: "purple", title: "Eco Tips" },
    { to: "/insights", color: "indigo", title: "Community Insights" },
  ];

  return (
    <div
      className="min-h-screen p-8 flex flex-col justify-center items-center"
      style={{
        backgroundImage: "url('/images/calm-background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg max-w-4xl w-full text-center">
        <h1 className="text-4xl font-extrabold text-blue-600 mb-6">
          Welcome to MindFlow
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Your companion for mental wellness and relaxation.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cardData.map(({ to, color, title }, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex justify-center"
            >
              <Link
                to={to}
                className={`bg-${color}-100 p-6 rounded-xl w-full max-w-xs shadow-md hover:shadow-lg transition transform`}
              >
                <h2 className={`text-xl font-semibold text-${color}-600 mb-1`}>
                  {title}
                </h2>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;