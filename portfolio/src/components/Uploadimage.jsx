import React, { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL
const UploadImage = () => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleUpload = async () => {
        if (!image) {
            alert("Please select an image first.");
            return;
        }

        setUploading(true);

        const formData = new FormData();
        formData.append("image", image);

        try {
            const response = await axios.post(`${API_URL}/api/upload`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            setImageUrl(response.data.url);
        } catch (error) {
            console.error("Upload error:", error);
            alert("Upload failed.");
        }

        setUploading(false);
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {preview && <img src={preview} alt="Preview" width="100" />}
            <button onClick={handleUpload} disabled={uploading}>
                {uploading ? "Uploading..." : "Upload"}
            </button>
            {imageUrl && (
                <div>
                    <p>Uploaded Image:</p>
                    <img src={imageUrl} alt="Uploaded" width="200" />
                </div>
            )}
        </div>
    );
};

export default UploadImage;
