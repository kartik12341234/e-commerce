import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "PLEASE WRITE EMAIL"],
  },
  password: {
    type: String,
    required: [true, "PLEASE WRITE PASSWORD"],
  },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

module.exports = User;
