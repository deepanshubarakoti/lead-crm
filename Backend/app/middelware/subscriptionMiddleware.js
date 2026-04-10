const Subscription = require("../models/subscriptionModel");

async function subscriptionMiddleware(req, res, next) {
  try {
    const businessId = req.user.businessId;

    const subscription = await Subscription.findOne({ businessId });

    if (!subscription) {
      return res.status(403).json({
        message: "No subscription found. Please purchase a plan.",
      });
    }

    if (subscription.status !== "active") {
      return res.status(403).json({
        message: "Subscription is not active.",
      });
    }

    if (!subscription.expiresAt || subscription.expiresAt < new Date()) {
      return res.status(403).json({
        message: "Subscription expired. Please renew.",
      });
    }

    next();
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}

module.exports = subscriptionMiddleware;
