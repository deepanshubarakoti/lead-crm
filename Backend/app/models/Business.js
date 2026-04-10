const mongoose = require("mongoose")

const businessSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  email: String,
  category: {
    type: String,
    enum: ["gym", "salon", "clinic", "spa", "other"],
    default: "gym"
  },
  address: String
}, { timestamps: true })

const businessModel = mongoose.model("Business", businessSchema)
module.exports = businessModel
