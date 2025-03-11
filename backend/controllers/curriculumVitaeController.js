const path = require("path");
const fs = require("fs");
const multer = require("multer");

// Allowed file types (PDF and Word documents)
const allowedMimeTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
];

// Configure Multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../public")); // Save in "public" folder
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname); // Get file extension
        cb(null, "cv" + ext); // Rename file to "cv.pdf" or "cv.docx"
    }
});

// File filter to allow only PDFs and Word docs
const fileFilter = (req, file, cb) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true); // Accept file
    } else {
        cb(new Error("Only PDF and Word documents are allowed"), false);
    }
};

// Set up Multer middleware
const upload = multer({ storage, fileFilter });

// Upload CV and delete the old one
const uploadCV = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded or file type not allowed." });
    }

    const uploadDir = path.join(__dirname, "../public");
    const uploadedFilePath = path.join(uploadDir, req.file.filename);

    // Check if old CV exists and delete it
    const existingFiles = fs.readdirSync(uploadDir).filter(file => file.startsWith("cv.") && file !== req.file.filename);
    existingFiles.forEach(file => fs.unlinkSync(path.join(uploadDir, file)));

    res.status(200).json({ message: "CV uploaded successfully!", filename: req.file.filename });
};

// Download CV
const downloadCV = (req, res) => {
    const filePath = path.join(__dirname, "../public", "cv.pdf");
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: "CV file not found." });
    }
    res.download(filePath, "My_CV.pdf");
};

// Delete CV
const deleteCV = (req, res) => {
    const uploadDir = path.join(__dirname, "../public");
    const existingFiles = fs.readdirSync(uploadDir).filter(file => file.startsWith("cv."));

    if (existingFiles.length === 0) {
        return res.status(404).json({ error: "CV file not found." });
    }

    existingFiles.forEach(file => fs.unlinkSync(path.join(uploadDir, file)));

    res.status(200).json({ message: "CV deleted successfully." });
};

// ✅ Check if a CV exists
const checkCV = (req, res) => {
    const uploadDir = path.join(__dirname, "../public");
    const existingFiles = fs.readdirSync(uploadDir).filter(file => file.startsWith("cv."));

    if (existingFiles.length === 0) {
        return res.json({ exists: false });
    }

    res.json({ exists: true, filename: existingFiles[0] });
};

module.exports = { upload, uploadCV, downloadCV, deleteCV, checkCV };
