const express = require("express");
const { upload, uploadCV, downloadCV, deleteCV, checkCV } = require("../controllers/curriculumVitaeController");



const router = express.Router();

// Upload CV with error handling
router.post("/upload-cv", (req, res, next) => {
    upload.single("cv")(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: err.message || "File upload failed." });
        }
        uploadCV(req, res);
    });
});

// Check if CV exists
router.get("/check-cv", checkCV);

// Download CV
router.get("/download-cv", downloadCV);

// Delete CV
router.delete("/delete-cv", deleteCV);

module.exports = router;
