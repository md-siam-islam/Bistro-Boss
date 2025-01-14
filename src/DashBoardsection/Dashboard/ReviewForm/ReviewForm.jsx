import React, { useContext, useState } from "react";
import Sheared from "../../../ShearedSEction/Sheared";
import { Authcontext } from "../../../AuthProvider/Authprovider";
import Axiospublic from "../../../AxiosPublic/Axiospublic";
import Swal from "sweetalert2";

const ReviewForm = () => {
  const { user } = useContext(Authcontext);
  const [rating, setRating] = useState(0);
  const useAxiospublic = Axiospublic()

  const handleSubmitreview = (e) => {
    e.preventDefault();
    const recipe = e.target.recipe.value;
    const suggestion = e.target.suggestion.value;
    const shortway = e.target.shortway.value;

    const review = {
      recipe,
      suggestion,
      details:shortway,
      rating,
      name: user.displayName,
      email: user.email,
    };
    console.log(review);
    useAxiospublic.post('/review',review)
    .then((res) => {
      if(res.data.insertedId){
        e.target.reset()
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your Review Add Successfull",
          showConfirmButton: false,
          timer: 1500
        });
      }
    })


  };

  return (
    <div>
      <Sheared
        Subtitle={"Sharing is Caring"}
        title={"GIVE A REVIEW..."}
      ></Sheared>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center mb-6">Rate Us!</h2>
          <div className="flex justify-center mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                onClick={() => setRating(star)}
                xmlns="http://www.w3.org/2000/svg"
                fill={star <= rating ? "#FFD700" : "none"}
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                className="w-8 h-8 text-gray-400 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.184 6.736a1 1 0 00.95.69h7.063c.97 0 1.371 1.24.588 1.81l-5.712 4.076a1 1 0 00-.364 1.118l2.185 6.736c.3.921-.755 1.688-1.538 1.118l-5.712-4.076a1 1 0 00-1.176 0l-5.712 4.076c-.783.57-1.838-.197-1.538-1.118l2.185-6.736a1 1 0 00-.364-1.118L2.61 11.163c-.783-.57-.382-1.81.588-1.81h7.063a1 1 0 00.95-.69l2.184-6.736z"
                />
              </svg>
            ))}
          </div>
          <form onSubmit={handleSubmitreview}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Which recipe you liked most?
              </label>
              <input
                type="text"
                name="recipe"
                placeholder="Recipe you liked most"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Do you have any suggestion for us?
              </label>
              <input
                type="text"
                name="suggestion"
                placeholder="Suggestion"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Kindly express your care in a short way.
              </label>
              <textarea
                placeholder="Review in detail"
                name="shortway"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                rows="4"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            >
              Send Review{" "}
              <span role="img" aria-label="rocket">
                🚀
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
