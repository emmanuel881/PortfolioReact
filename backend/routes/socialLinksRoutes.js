const express = require("express");
const router = express.Router();

const {
    getSocialLinks,
    createSocialLinks,
    updateSocialLinks,
    deleteSocialLinks
} = require("../controllers/socialLinksController");
const authenticateAdmin = require("../middleware/authMiddleware");

// GET single social links document
router.get("/", getSocialLinks);

// CREATE social links (only if none exist)
router.post("/", authenticateAdmin, createSocialLinks);

// UPDATE social links
router.patch("/", authenticateAdmin, updateSocialLinks);

// DELETE social links
router.delete("/", authenticateAdmin, deleteSocialLinks);

module.exports = router;
