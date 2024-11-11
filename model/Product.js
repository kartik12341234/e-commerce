// models/Product.js
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      minlength: 100,
    },
    price: {
      type: Number,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    additionalImages: {
      type: [String], // Array of image URLs
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
