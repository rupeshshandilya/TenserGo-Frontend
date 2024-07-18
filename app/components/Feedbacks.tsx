"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import FeedbackForm from "./FeedbackForm";

interface Feedback {
  id: string;
  userId: string;
  category: string;
  comments: string;
  userEmail?: string;
}

const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [user, setUser] = useState<{ id?: string; email?: string } | null>(
    null
  );

  useEffect(() => {
    fetchFeedbacks();
    fetchUserDetails();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get("http://localhost:4000/feedbacks");
      setFeedbacks(response.data);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  const fetchUserDetails = () => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  };

  const handleDelete = (userId: any, category:any) => {
    axios.delete(`http://localhost:4000/feedback/delete/${userId}/${encodeURIComponent(category)}`)
      .then(() => {
        alert("Feedback deleted successfully!");
        setFeedbacks(feedbacks.filter(fb => fb.userId !== userId || fb.category !== category));
      })
      .catch(error => {
        console.error("Failed to delete feedback:", error);
      });
  };

  const handleFeedbackSubmit = async (feedback: Feedback) => {
    try {
      await fetchFeedbacks();
    } catch (error) {
      console.error("Failed to update feedback list after submission:", error);
    }
  };

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-xl font-semibold text-gray-800 mb-6">
        User Feedbacks
      </h1>
      {user ? (
        <FeedbackForm userId={user.id} onFeedbackSubmit={handleFeedbackSubmit} />
      ) : (
        <p>Please sign in to submit feedback.</p>
      )}
      <ul className="divide-y divide-gray-200">
        {feedbacks.map((feedback) => (
          <li key={feedback.id} className="py-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold text-gray-700">
                  {feedback.category}
                </p>
                <p className="text-xs text-gray-500">{feedback.comments}</p>
                <p className="text-xs text-gray-500">
                  Submitted by: {feedback.userEmail}
                </p>
              </div>
              {user && user.id === feedback.userId && (
                <div className="flex items-center space-x-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      handleDelete(feedback.userId, feedback.category)
                    }
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Feedbacks;
