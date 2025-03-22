// frontend/src/components/Feedback.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Feedback() {
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  const handleSubmitFeedback = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/feedback",
        { comment },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Feedback submitted successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Failed to submit feedback", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Feedback</h2>
      <textarea
        placeholder="Enter your feedback here..."
        rows="5"
        onChange={(e) => setComment(e.target.value)}
      />
      <br />
      <button onClick={handleSubmitFeedback}>Submit Feedback</button>
      <button onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
    </div>
  );
}

export default Feedback;
