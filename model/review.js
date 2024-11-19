import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  username: { type: String, required: true }, // User's name
  verified: { type: Boolean, default: false }, // Whether the user is verified
  rating: { type: Number, required: true }, // Rating (1 to 5 stars)
  comment: { type: String, required: true }, // Review text
  helpfulVotes: { type: Number, default: 0 }, // Helpful votes count
  notHelpfulVotes: { type: Number, default: 0 }, // Not helpful votes count
  date: { type: Date, default: Date.now }, // Date of the review
});

const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);

export default Review;
