const express = require("express");
const { sendEmail } = require("../controllers/mailController"); // Import controller
const router = express.Router();

router.post("/", sendEmail);

module.exports = router;
