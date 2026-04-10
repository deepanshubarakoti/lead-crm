const User = require("../models/User");
const Business = require("../models/Business");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function signUp(req, res) {
  try {
    const { email, password, businessName, phone } = req.body;

    if (!email || !password || !businessName || !phone) {
      return res
        .status(400)
        .json({ success: false, message: "All fields required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ success: false, message: "Password must be 6+ chars" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const business = await Business.create({
      name: businessName,
      phone,
    });

    const user = await User.create({
      email,
      password: hashedPassword,
      businessId: business._id,
    });

    business.ownerId = user._id;
    await business.save();

    const token = jwt.sign(
      { userId: user._id, businessId: business._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.cookie("token", token);

    res.status(201).json({
      success: true,
      token,
      userId: user._id,
      businessId: business._id,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ success: false, message: "All fields required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, businessId: user.businessId },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 din
    });

    res.status(200).json({
      success: true,
      token,
      userId: user._id,
      businessId: user.businessId,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { signUp, login };
