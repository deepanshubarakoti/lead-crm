const mongoose = require("mongoose")

const leadSchema = new mongoose.Schema({
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Business",
    required: true
  },

  customer_name: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true
  },

  service: {
    type: String
  },

  status: {
    type: String,
    enum: ["New", "Contacted", "Booked", "Lost", "Converted"],
    default: "New"
  },

  lead_source: {
    type: String,
    enum: ["Instagram", "Facebook", "WhatsApp", "Phone", "Website Form"]
  },

  notes: {
    type: String
  }

}, { timestamps: true });


const leadModel = mongoose.model("Lead" , leadSchema)


module.exports = leadModel