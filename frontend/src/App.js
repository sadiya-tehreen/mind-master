import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Pages and Components
import Dashboard from "./components/Dashboard";
import CheckIn from "./components/CheckIn";
import GratitudeJar from "./components/GratitudeJar";
import ScenarioVisualization from "./components/RelaxationScenarios";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/Auth/LoginPage";
import SignUpPage from "./components/Auth/SignUpPage";
import CommunityInsights from "./components/CommunityInsights";
import AIDrivenPersonalization from "./components/AIDrivenPersonalization";
import EcoConsciousSuggestions from "./components/EcoConsciousSuggestions";
import './components/styles.css';

// Fallback Component for undefined routes
const NotFound = () => (
  <div className="text-center py-20">
    <h1 className="text-5xl font-bold text-gray-700">404</h1>
    <p className="text-lg text-gray-500">Page not found.</p>
    <a href="/" className="text-blue-500 hover:underline">
      Back to Home
    </a>
  </div>
);

function App() {
  return (
    <Router>
      {/* Application Layout */}
      <div className="min-h-screen bg-gradient-to-r from-blue-100 via-white to-green-100">
        <Routes>
          {/* Landing and Authentication */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* Dashboard and Core Features */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/checkin" element={<CheckIn />} />
          <Route path="/gratitude" element={<GratitudeJar />} />
          <Route path="/scenario" element={<ScenarioVisualization />} />

          {/* AI and Eco Features */}
          <Route path="/personalization" element={<AIDrivenPersonalization />} />
          <Route path="/eco-tips" element={<EcoConsciousSuggestions />} />

          {/* Community Insights */}
          <Route path="/insights" element={<CommunityInsights />} />

          {/* Fallback for Undefined Routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
