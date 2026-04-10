const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const leadRoutes = require("./routes/leadRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();
app.use(cookieParser());

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/payment/", paymentRoutes);

module.exports = app;
