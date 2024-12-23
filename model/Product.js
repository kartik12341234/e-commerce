import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: [
      {
        paragraph: { type: String },
        imageUrl: { type: String },
      },
    ],
    ingredients: {
      type: String,
      // required: true,
    },
    benefits: {
      type: String,
      // required: true,
    },
    storageInfo: {
      type: String,
      // required: true,
      minlength: 100,
    },
    sizes: [
      {
        size: { type: String },
        price: { type: Number },
      },
    ],
    imageUrl: {
      type: String,
      // required: true,
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
