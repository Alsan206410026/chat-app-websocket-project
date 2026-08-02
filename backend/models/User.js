const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },

    phoneNumber: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    status: {
        type: String,
        enum: ["inactive", "active", "suspended"],
        default: "active"
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    otp: {
        type: String,
    },
    otpExpires: {
        type: Date,
    },
    verified: {
        type: Boolean,
        default: false,
    }

},
{ timestamps: true }
);
module.exports = mongoose.model("User", userSchema);