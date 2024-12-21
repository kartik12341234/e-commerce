import mongoose from "mongoose";

const orderdeliveredSchema = new mongoose.Schema({
  orderId: {
    type: String,
  },
  productId: {
    type: String,
  },
  Amount: {
    type: Number,
  },
});
export default mongoose.models.Delivered ||
  mongoose.model("Delivered", orderdeliveredSchema);
