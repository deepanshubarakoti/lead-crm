const express = require("express");
const {
  createLead,
  getAllLeads,
  updateLead,
  deleteLead,
} = require("../controllers/leadController");
const authMiddleware = require("../middelware/authMiddelware");
const subscriptionMiddleware = require("../middelware/subscriptionMiddleware");

const router = express.Router();

router.post("/create-lead", authMiddleware, subscriptionMiddleware, createLead);
router.get("/get-leads", authMiddleware, getAllLeads);
router.patch("/update-lead/:id", authMiddleware, updateLead);
router.delete("/delete-lead/:id", authMiddleware, deleteLead);

module.exports = router;
