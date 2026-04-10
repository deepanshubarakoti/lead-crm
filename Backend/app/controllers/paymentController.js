const Razorpay = require("razorpay");
const crypto = require("crypto");
const Subscription = require("../models/subscriptionModel");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

async function createOrder(req, res) {
  try {
    const businessId = req.user.businessId

    const order = await razorpay.orders.create({
      amount: 49900,
      currency: "INR",
      receipt: `receipt_${businessId}`,
    });

    res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function verifyPayment(req, res) {
  try {
    const businessId = req.user.businessId
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      plan,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .toString("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid payment" });
    }

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    await Subscription.findOneAndUpdate(
      { businessId },
      {
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        status: "active",
        plan,
        amount: 499,
        expiresAt,
        renewedAt: new Date(),
      },
      { upsert: true, new: true }
    );

    res.status(200).json({
      success: true,
      message: "Payment verified & subscription activated",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { createOrder, verifyPayment };