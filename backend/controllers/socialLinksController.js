const SocialLinks = require("../models/socialLiksModel");
const mongoose = require("mongoose");

// GET single social links document
const getSocialLinks = async (req, res) => {
    try {
        const socialLinks = await SocialLinks.findOne(); // Fetch the first document
        if (!socialLinks) {
            return res.status(404).json({ error: "No social links found" });
        }
        res.status(200).json(socialLinks);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch social links" });
    }
};

// CREATE new social links (only if none exist)
const createSocialLinks = async (req, res) => {
    try {
        const existingLinks = await SocialLinks.findOne();
        if (existingLinks) {
            return res.status(400).json({ error: "Social links already exist. Update instead." });
        }

        const { linkedIn, instagram, facebook, twitterX } = req.body;
        const socialLink = await SocialLinks.create({ linkedIn, instagram, facebook, twitterX });

        res.status(201).json(socialLink);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// UPDATE existing social links
const updateSocialLinks = async (req, res) => {
    try {
        const socialLinks = await SocialLinks.findOne();
        if (!socialLinks) {
            return res.status(404).json({ error: "No social links found to update." });
        }

        const updatedLinks = await SocialLinks.findByIdAndUpdate(
            socialLinks._id,
            req.body,
            { new: true }
        );

        res.status(200).json(updatedLinks);
    } catch (error) {
        res.status(500).json({ error: "Failed to update social links" });
    }
};

// DELETE social links
const deleteSocialLinks = async (req, res) => {
    try {
        const socialLinks = await SocialLinks.findOne();
        if (!socialLinks) {
            return res.status(404).json({ error: "No social links found to delete." });
        }

        await SocialLinks.findByIdAndDelete(socialLinks._id);
        res.status(200).json({ message: "Social links deleted successfully." });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete social links" });
    }
};

module.exports = {
    getSocialLinks,
    createSocialLinks,
    updateSocialLinks,
    deleteSocialLinks
};
