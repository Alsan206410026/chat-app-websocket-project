const express = require('express');
const router = express.Router();
const { registerUser, verifyOTP, loginUser, logoutUser } = require('../controllers/auth.controller');
const { protect } = require('../middlewares/auth.middleware');

router.post('/register', registerUser);
router.post('/verify-otp', verifyOTP);
router.post('/login', loginUser);
router.post('/logout', protect, logoutUser);



module.exports = router;