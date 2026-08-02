const express = require("express");
const router = express.Router();
const { getUsersForSidebar } = require("../controllers/user.controller.js");
const { protect } = require("../middlewares/auth.middleware.js");

router.get("/getUsers",protect, getUsersForSidebar);

module.exports = router;