// models/Order.js
import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  useremail: { type: String },
  product: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  amount: { type: Number, required: true },
  userInfo: {
    name: String,
    phone: String,
    email: String,
    address: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  paymentId: String,
  status: { type: String, default: "created" },
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
