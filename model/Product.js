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

    ingredients: [
      {
        paragraph: { type: String },
        imageUrl: { type: String },
      },
    ],
    Skincare: [
      {
        paragraph: { type: String },
        imageUrl: { type: String },
      },
    ],
    Haircare: [
      {
        paragraph: { type: String },
        imageUrl: { type: String },
      },
    ],
    Wellness: [
      {
        paragraph: { type: String },
        imageUrl: { type: String },
      },
    ],
    Massage: [
      {
        paragraph: { type: String },
        imageUrl: { type: String },
      },
    ],
    OilPulling: [
      {
        paragraph: { type: String },
        imageUrl: { type: String },
      },
    ],
    MakeupRemoval: [
      {
        paragraph: { type: String },
        imageUrl: { type: String },
      },
    ],
    HairLoss: [
      {
        paragraph: { type: String },
        imageUrl: { type: String },
      },
    ],
    ShelfLife: [
      {
        paragraph: { type: String },
        imageUrl: { type: String },
      },
    ],
    Certifications: [
      {
        paragraph: { type: String },
        imageUrl: { type: String },
      },
    ],
    WhyChooseUs: [
      {
        paragraph: { type: String },
        imageUrl: { type: String },
      },
    ],
    comparisons: [
      {
        paragraph: { type: String },
        imageUrl: { type: String },
      },
    ],

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
