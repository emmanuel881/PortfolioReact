const express = require("express");
const upload = require("../config/multerConfig");
const { uploadImage, deleteImage } = require("../controllers/imageUploadController");

const router = express.Router();

router.post("/upload", upload.single("image"), uploadImage);
router.delete("/delete", deleteImage);

module.exports = router;
