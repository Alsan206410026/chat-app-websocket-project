const User = require("../models/User");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { sendEmail } = require("../utils/sendEmail");
const { generateToken } = require("../utils/generatejwt&setcookie");




// Register User

const registerUser = async (req, res) => {
  const { fullName, email, phoneNumber, password } = req.body;

  try {
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Please enter a valid email address.",
      });
    }

    // Validate password
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and contain uppercase, lowercase, number and special character.",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });

    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    const message = `Welcome to our platform!

Your OTP is ${otp}. It will expire in 10 minutes.

Verify your email by entering the OTP in the app.`;

    // User already exists
    if (existingUser) {

      // Already verified
      if (existingUser.verified) {
        return res.status(400).json({
          message: "User already exists",
        });
      }

      // Not verified -> resend OTP
      existingUser.otp = otp;
      existingUser.otpExpiry = otpExpiry;

      await existingUser.save();

      await sendEmail(email, "Verify your email", message);

      return res.status(200).json({
        message: "A new OTP has been sent to your email.",
        otp: otp, // For testing purposes, remove in production
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      otp,
      otpExpiry,
      verified: false,
    });

    await sendEmail(email, "Verify your email", message);

    return res.status(201).json({
      message: "User registered successfully. Please verify your email.",
      otp: otp, // For testing purposes, remove in production
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


// Verify OTP

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    if (user.otpExpiry < new Date()) {
      return res.status(400).json({
        message: "OTP has expired",
      });
    }

    user.verified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;

    await user.save();

    const token = generateToken(user._id, res); // Generate token and set cookie

    return res.status(200).json({
      message: "OTP verified successfully",
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      token
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


// Login User

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (!user.verified) {
      return res.status(400).json({
        message: "Please verify your email before logging in.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }


    return res.status(200).json({
      message: "Login successful",
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      token: generateToken(user._id, res), // Generate token and set cookie
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//logout user

const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false, // Set to true if using HTTPS
    sameSite: "strict",
  });

  return res.status(200).json({
    message: "Logged out successfully",
  });
};

// Exports

module.exports = {
  registerUser,
  verifyOTP,
  loginUser,
  logoutUser,
};