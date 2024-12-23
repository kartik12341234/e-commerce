import mongoose from "mongoose";

const HproductSchema = new mongoose.Schema(
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
    cooking: {
      type: String,
      // required: true,
    },
    Skincare: {
      type: String,
      // required: true,
    },
    Haircare: {
      type: String,
      // required: true,
    },
    Wellness: {
      type: String,
      // required: true,
    },
    OilPulling: {
      type: String,
      required: true,
    },
    shelfLife: {
      type: String,
      required: true,
    },
    WCU: {
      type: String,
      required: true,
    },
    comparison: {
      type: String,
      required: true,
    },
    MakeupRemoval: {
      type: String,
      required: true,
      // minlength: 100,
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

export default mongoose.models.Hproduct ||
  mongoose.model("Hproduct", HproductSchema);
