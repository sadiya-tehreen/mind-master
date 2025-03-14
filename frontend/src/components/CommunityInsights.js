import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import "./styles.css";

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CommunityInsights = () => {
  // Chart data
  const data = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Users Participated",
        data: [50, 70, 40, 90, 60],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Community Insights - Participation Trends",
      },
    },
  };

  // State for forum posts
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  // Handle new post submission
  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (newPost.trim() !== "") {
      setPosts([...posts, newPost]);
      setNewPost("");
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Chart Section */}
      <h2 className="text-2xl font-bold mb-4">Community Insights</h2>
      <Bar data={data} options={options} />

      {/* Community Forum Section */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Community Forum</h3>
        
        {/* Forum Post Input */}
        <form onSubmit={handlePostSubmit} className="mb-4">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Share your journey or insights..."
            className="w-full p-2 border rounded-md"
            rows="3"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
          >
            Post
          </button>
        </form>

        {/* Display User Posts */}
        <div className="space-y-4">
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <div
                key={index}
                className="p-3 bg-gray-100 rounded-md border shadow-sm"
              >
                {post}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No posts yet. Be the first to share!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunityInsights;
