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
    ingredients: {
      type: String,
      required: true,
    },
    ingredients: {
      type: String,
      // required: true,
    },
    ingredients: {
      type: String,
      // required: true,
    },
    ingredients: {
      type: String,
      // required: true,
    },
    ingredients: {
      type: String,
      // required: true,
    },
    Benefits: {
      type: String,
      required: true,
    },
    storageinfo: {
      type: String,
      required: true,
      minlength: 100,
    },
    sizes: [
      {
        size: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
    imageUrl: {
      type: String,
      required: true,
    },
    additionalImages: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
