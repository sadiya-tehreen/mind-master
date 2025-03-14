// // src/components/AIDrivenPersonalization.js
// import React, { useState } from "react";

// function AIDrivenPersonalization() {
//   const [recommendations, setRecommendations] = useState([]);

//   const fetchRecommendations = () => {
//     // Example AI-powered logic
//     setRecommendations([
//       "Take a 5-minute mindfulness break.",
//       "Listen to soothing ocean waves.",
//       "Reflect on three positive moments from today.",
//     ]);
//   };

//   return (
//     <div className="p-8 text-center">
//       <h1 className="text-3xl font-bold text-pink-600 mb-4">
//         Personalized Recommendations
//       </h1>
//       <button
//         onClick={fetchRecommendations}
//         className="bg-pink-500 text-white px-4 py-2 rounded"
//       >
//         Get Recommendations
//       </button>
//       <ul className="mt-6 text-left">
//         {recommendations.map((rec, index) => (
//           <li key={index} className="mb-2 text-gray-700">
//             {rec}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default AIDrivenPersonalization;

import React, { useState } from "react";

function AIDrivenPersonalization() {
  const [recommendations, setRecommendations] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState("");

  // Example recommendations data
  const fetchRecommendations = () => {
    setRecommendations([
      "Take a 5-minute mindfulness break.",
      "Listen to soothing ocean waves.",
      "Reflect on three positive moments from today.",
    ]);
  };

  // Simple AI-powered chatbot responses
  const chatbotResponses = {
    hello: "Hi there! How can I help you today?",
    stress: "I'm sorry to hear that. Try some deep breathing or take a short walk to clear your mind.",
    anxious: "It's okay to feel this way. Practice grounding exercises like focusing on your surroundings.",
    exercise: "Exercise is great for mental health! A short yoga or cardio session can uplift your mood.",
    gratitude: "Practicing gratitude is wonderful. Write down 3 things you're thankful for.",
    default: "I'm here to help. Try asking me about stress, anxiety, or mental wellness tips.",
  };

  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  };

  const handleChatSubmit = () => {
    const userMessage = userInput.toLowerCase();
    const botResponse =
      chatbotResponses[
        Object.keys(chatbotResponses).find((key) =>
          userMessage.includes(key)
        ) || "default"
      ];

    setChatHistory([
      ...chatHistory,
      { sender: "user", text: userInput },
      { sender: "bot", text: botResponse },
    ]);
    setUserInput(""); // Clear input field
  };

  return (
    <div className="p-8 text-center min-h-screen bg-gradient-to-r from-pink-100 via-white to-purple-100">
      <h1 className="text-4xl font-bold text-pink-600 mb-6">
        Personalized Recommendations & Chatbot
      </h1>

      {/* Recommendations Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Get Your AI Recommendations
        </h2>
        <button
          onClick={fetchRecommendations}
          className="bg-pink-500 text-white px-4 py-2 rounded shadow-md hover:bg-pink-600 transition"
        >
          Fetch Recommendations
        </button>
        <ul className="mt-6 text-left">
          {recommendations.map((rec, index) => (
            <li key={index} className="mb-2 text-gray-800 bg-pink-100 p-2 rounded">
              {rec}
            </li>
          ))}
        </ul>
      </div>

      {/* Chatbot Section */}
      <div className="bg-white bg-opacity-90 p-6 rounded shadow-lg max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-purple-600 mb-4">
          Chat with Our Wellness Bot
        </h2>
        <div className="border border-gray-300 rounded p-4 mb-4 max-h-64 overflow-y-auto">
          {chatHistory.length === 0 ? (
            <p className="text-gray-500">Say hello to start chatting!</p>
          ) : (
            chatHistory.map((message, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  message.sender === "user"
                    ? "text-right text-blue-600"
                    : "text-left text-gray-800"
                }`}
              >
                <p className="inline-block bg-gray-200 p-2 rounded">
                  {message.text}
                </p>
              </div>
            ))
          )}
        </div>
        <div className="flex">
          <input
            type="text"
            value={userInput}
            onChange={handleUserInput}
            placeholder="Ask me anything about mental wellness..."
            className="flex-1 border border-gray-300 rounded-l p-2 focus:outline-none"
          />
          <button
            onClick={handleChatSubmit}
            className="bg-purple-500 text-white px-4 rounded-r hover:bg-purple-600 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default AIDrivenPersonalization;

// import React, { useState } from "react";

// function AIDrivenPersonalization() {
//   const [chatHistory, setChatHistory] = useState([]);
//   const [userInput, setUserInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // API URL for the Flask backend (update with the correct URL if deployed)
//   const CHATBOT_API_URL = 'http://127.0.0.1:5000/chat';

//   // Handle user input
//   const handleUserInput = (event) => {
//     setUserInput(event.target.value);
//   };

//   // Handle chat submission and send input to chatbot API
//   const handleChatSubmit = async () => {
//     if (!userInput.trim()) {
//       setError("Please enter a message before sending.");
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(CHATBOT_API_URL, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           message: userInput,
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || "Something went wrong with the chatbot API");
//       }

//       const data = await response.json();
//       const botResponse = data.response || "I'm here to help!";

//       // Add user message and chatbot response to chat history
//       setChatHistory([
//         ...chatHistory,
//         { sender: "user", text: userInput },
//         { sender: "bot", text: botResponse },
//       ]);
//       setUserInput(""); // Clear input field
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-8 text-center min-h-screen bg-gradient-to-r from-pink-100 via-white to-purple-100">
//       <h1 className="text-4xl font-bold text-pink-600 mb-6">
//         Chat with Our Wellness Bot 🤖
//       </h1>

//       {/* Chatbot Section */}
//       <div className="bg-white bg-opacity-90 p-6 rounded shadow-lg max-w-3xl mx-auto">
//         <div className="border border-gray-300 rounded p-4 mb-4 max-h-64 overflow-y-auto">
//           {chatHistory.length === 0 ? (
//             <p className="text-gray-500">Say hello to start chatting!</p>
//           ) : (
//             chatHistory.map((message, index) => (
//               <div
//                 key={index}
//                 className={`mb-2 ${message.sender === "user" ? "text-right text-blue-600" : "text-left text-gray-800"}`}
//               >
//                 <p className="inline-block bg-gray-200 p-2 rounded">
//                   {message.text}
//                 </p>
//               </div>
//             ))
//           )}
//         </div>
//         <div className="flex">
//           <input
//             type="text"
//             value={userInput}
//             onChange={handleUserInput}
//             placeholder="Ask me anything about mental wellness..."
//             className="flex-1 border border-gray-300 rounded-l p-2 focus:outline-none"
//           />
//           <button
//             onClick={handleChatSubmit}
//             className="bg-purple-500 text-white px-4 rounded-r hover:bg-purple-600 transition"
//           >
//             {loading ? "Thinking..." : "Send"}
//           </button>
//         </div>
//         {error && <p className="mt-4 text-red-600">{error}</p>}
//       </div>
//     </div>
//   );
// }

// export default AIDrivenPersonalization;
