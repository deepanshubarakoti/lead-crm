const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Business",
    required: true
  },
  role: {
    type: String,
    enum: ["owner", "staff"],
    default: "owner"
  }
}, { timestamps: true }) // createdAt, updatedAt will add automattacly

const userModel = mongoose.model("User", userSchema)
module.exports = userModel