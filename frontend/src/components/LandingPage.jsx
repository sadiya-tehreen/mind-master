import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 text-center">
      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-6">
        <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Mind Flow
        </h1>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Discover Your Wellness Journey!!
        </h2>

        {/* Single Powerful Quote */}
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto mb-8 border-2 border-black">
          <p className="text-xl text-blue-600 italic mb-6">
            "Happiness is not something ready-made. It comes from your own actions." – Dalai Lama
          </p>
          <hr className="border-t-2 border-gray-300 mb-6" />
          <p className="text-lg text-gray-600">
            Take a step towards positive change today. Your wellness journey starts with one decision.
          </p>
        </div>

        {/* Call to Action */}
        <div>
          <Link to="/login">
            <button className="px-10 py-5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-lg font-semibold rounded-full shadow-xl hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-700 transform transition-all duration-300">
              Start Your Journey
            </button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 bg-black text-white text-sm border-t-4">
        MindFlow © 2024 | Discover Your Best Self
      </footer>
    </div>
  );
};

export default LandingPage;