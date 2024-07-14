"use client";
import { useState, FormEvent } from "react";
import axios from "axios";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";

interface FeedbackFormProps {
  userId?: string;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ userId }) => {
  const [category, setCategory] = useState<string>("Product Features");
  const [comments, setComments] = useState<string>("");

  const handleSubmit = async (event: FormEvent) => {


    try {
      const response = await axios.post("http://localhost:4000/feedback", {
        userId: userId,
        category,
        comments,
      });

      alert("Feedback submitted successfully!");
      //Reset Fields
      setCategory("Product Features");
      setComments("");
    } catch (error) {
      console.error("Failed to submit feedback:", error);
      // alert('Failed to submit feedback. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Feedback Form
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="text-gray-900 font-medium block mt-4 mb-2">
                Category
              </label>
              <select
                id="categoryId"
                className="form-select w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Product Features">Product Features</option>
                <option value="Product Pricing">Product Pricing</option>
                <option value="Product Usability">Product Usability</option>
              </select>
            </div>
            <div>
              <label>Comments</label>
              <textarea
                rows={3}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Write a few sentences about yourself."
                className="form-textarea w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              ></textarea>
            </div>
          </div>

          {/* <!-- Buttons --> */}
          <div className="flex justify-end space-x-4 mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
