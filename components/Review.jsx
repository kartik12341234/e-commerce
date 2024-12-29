"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import "./cr.css";
import Wr from "./Wr";
import { User, UserCheck } from "lucide-react";
const CustomerReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    username: "",
    verified: false,
    rating: 5,
    comment: "",
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get("/api/reviews");
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/reviews", newReview);
      setNewReview({ username: "", verified: false, rating: 5, comment: "" });
      alert("Review submitted successfully!");
      fetchReviews(); // Refresh reviews after submission
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <>
      <h2>Customer Reviews</h2>
      <Wr></Wr>

      <div className="reviews-container">
        <div className="review-summary">
          {/* Add a summary UI for the average rating */}
        </div>
        <form onSubmit={handleSubmit} className="review-form">
          <input
            type="text"
            placeholder="Your name"
            value={newReview.username}
            onChange={(e) =>
              setNewReview({ ...newReview, username: e.target.value })
            }
            required
          />
          <textarea
            placeholder="Write your review"
            value={newReview.comment}
            onChange={(e) =>
              setNewReview({ ...newReview, comment: e.target.value })
            }
            required
          />
          <select
            value={newReview.rating}
            onChange={(e) =>
              setNewReview({ ...newReview, rating: parseInt(e.target.value) })
            }
          >
            {[5, 4, 3, 2, 1].map((star) => (
              <option key={star} value={star}>
                {star} Star{star > 1 ? "s" : ""}
              </option>
            ))}
          </select>
          <button type="submit">Submit Review</button>
        </form>

        <div className="reviews-list">
          {reviews.map((review) => (
            <div key={review._id} className="review">
              <div className="rating">{Array(review.rating).fill("⭐")}</div>
              <h3 style={{ display: "flex", gap: "10px" }}>
                <div
                  className="dj"
                  style={{ backgroundColor: "grey", borderRadius: "4px" }}
                >
                  <UserCheck color="#000"></UserCheck>{" "}
                </div>
                {review.username}{" "}
                <span className="verified" style={{ marginLeft: "-6px" }}>
                  Veified ✔{" "}
                </span>
                {review.verified && <span className="verified">Verified</span>}
              </h3>
              <p>{review.comment}</p>
              <div className="review-footer">
                <span>{new Date(review.date).toLocaleDateString()}</span>
                <div>
                  <button>👍 {review.helpfulVotes}</button>
                  <button>👎 {review.notHelpfulVotes}</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CustomerReviews;
