"use client";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface FeedbackFormProps {
  userId?: string;
  onFeedbackSubmit?: (feedback: any) => void; 
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ userId, onFeedbackSubmit }) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "Product Features",
      comments: ""
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = {
      ...data,
      userId: userId
    };
    await axios.post("/api/feedback", formData)
    .then((response) => {
      toast.success("Feedback submitted successfully!");
      reset({
        comments: ""
      });
      if (onFeedbackSubmit) {
        onFeedbackSubmit(response.data);  
      }
    }).catch((error) => {
      toast.error("Failed to submit feedback");
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Feedback Form
        </h2>
        <form>
          <div className="space-y-4">
            <div>
              <label className="text-gray-900 font-medium block mt-4 mb-2">
                Category
              </label>
              <select
                id="category"
                className="form-select w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                {...register("category")}
              >
                <option value="Product Features">Product Features</option>
                <option value="Product Pricing">Product Pricing</option>
                <option value="Product Usability">Product Usability</option>
              </select>
            </div>
            <div>
              <label>Comments</label>
              <textarea
                id="comments"
                rows={3}
                placeholder="Write a few sentences about yourself."
                required
                {...register("comments")}
                className="form-textarea w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              ></textarea>
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
              onClick={handleSubmit(onSubmit)}
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
