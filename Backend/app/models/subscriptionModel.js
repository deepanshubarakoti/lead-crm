const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
      unique: true,
    },
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
    status: {
      type: String,
      enum: ["pending", "active", "expired", "cancelled"],
      default: "pending",
    },
    plan: {
      type: String,
      enum: ["starter", "professional", "business"],
      default: "starter",
    },
    amount: { type: Number },
    expiresAt: { type: Date },
    renewedAt: { type: Date },
  },
  { timestamps: true },
);

const subscriptionModel = mongoose.model("Subscription", subscriptionSchema);


module.exports = subscriptionModel