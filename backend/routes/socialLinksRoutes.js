const express = require("express");
const router = express.Router();

const {
    getSocialLinks,
    createSocialLinks,
    updateSocialLinks,
    deleteSocialLinks
} = require("../controllers/socialLinksController");


// GET single social links document
router.get("/", getSocialLinks);

// CREATE social links (only if none exist)
router.post("/", createSocialLinks);

// UPDATE social links
router.patch("/", updateSocialLinks);

// DELETE social links
router.delete("/", deleteSocialLinks);

module.exports = router;
