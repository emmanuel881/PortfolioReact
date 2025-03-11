const cloudinary = require("../config/cloudinary");

// Upload Image to Cloudinary
const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        cloudinary.uploader.upload_stream(
            { resource_type: "image" },
            (error, cloudinaryResult) => {
                if (error) {
                    return res.status(500).json({ error: error.message });
                }

                return res.status(200).json({
                    public_id: cloudinaryResult.public_id,
                    url: cloudinaryResult.secure_url
                });
            }
        ).end(req.file.buffer);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Delete Image from Cloudinary
const deleteImage = async (req, res) => {
    const { publicId } = req.body; // Get the public ID from request

    if (!publicId) {
        return res.status(400).json({ error: "Public ID is required" });
    }

    try {
        const result = await cloudinary.uploader.destroy(publicId);

        if (result.result !== "ok") {
            return res.status(400).json({ error: "Failed to delete image" });
        }

        return res.status(200).json({ message: "Image deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { uploadImage, deleteImage };
