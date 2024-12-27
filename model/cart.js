import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
    },
    productName: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    useremail: {
      type: String,
    },
  },
  { timestamps: true }
); // Automatically adds createdAt and updatedAt fields

export default mongoose.models.Cart || mongoose.model("Cart", cartSchema);
