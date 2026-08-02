const express = require("express");
const router = express.Router();
const { sendMessage, getMessages } = require("../controllers/message.controller.js");
const { protect } = require("../middlewares/auth.middleware.js");


router.get("/getMessages/:id",protect, getMessages);
router.post("/send/:id",protect, sendMessage);



module.exports = router;