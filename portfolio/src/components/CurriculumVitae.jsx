import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const CurriculumVitae = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [savedCV, setSavedCV] = useState(null);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(""); // Success, error, or warning

    // Fetch saved CV on load
    useEffect(() => {
        const checkSavedCV = async () => {
            try {
                const response = await fetch(`${API_URL}/api/cv/check-cv`);
                const data = await response.json();
                if (data.exists) {
                    setSavedCV(data.filename); // Set the saved CV filename
                } else {
                    setSavedCV(null);
                }
            } catch (error) {
                showMessage("⚠️ Error checking saved CV.", "error");
            }
        };

        checkSavedCV();
    }, []);

    const showMessage = (msg, type = "info") => {
        setMessage(msg);
        setMessageType(type);
        setTimeout(() => setMessage(""), 3000); // Auto-hide after 3s
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            showMessage("⚠️ Please select a file to upload.", "warning");
            return;
        }

        const formData = new FormData();
        formData.append("cv", selectedFile);

        try {
            const response = await fetch(`${API_URL}/api/cv/upload-cv`, {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            showMessage(data.message || "✅ CV uploaded successfully!", "success");
            setSavedCV(selectedFile.name);
            setSelectedFile(null);
        } catch (error) {
            showMessage("❌ Upload failed. Please try again.", "error");
        }
    };

    const handleDownload = async () => {
        try {
            const response = await fetch(`${API_URL}/api/cv/download-cv`);
            if (response.status === 404) {
                showMessage("⚠️ CV not found.", "warning");
                return;
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "My_CV.pdf";
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (error) {
            showMessage("❌ Download failed.", "error");
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`${API_URL}/api/cv/delete-cv`, {
                method: "DELETE",
            });
            const data = await response.json();
            showMessage(data.message || "✅ CV deleted successfully!", "success");
            setSavedCV(null);
        } catch (error) {
            showMessage("❌ Delete failed.", "error");
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-200 mb-4 text-center">Manage Your CV</h2>

            {/* Show Saved CV if Exists */}
            {savedCV ? (
                <div className="mb-4 p-3 bg-gray-800 rounded-lg text-gray-300">
                    <p className="font-medium">📂 CV uploaded: {savedCV}</p>
                </div>
            ) : (
                <p className="mb-4 text-gray-400">No CV saved.</p>
            )}

            {/* File Upload Section */}
            <div className="mb-4">
                <label className="block text-gray-300 font-medium mb-2">Select CV File:</label>
                <div className="relative flex items-center border border-gray-600 rounded-lg p-3 bg-gray-700 text-gray-300">
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 w-full cursor-pointer"
                    />
                    <span className="truncate">
                        {selectedFile ? selectedFile.name : "No file selected"}
                    </span>
                </div>
            </div>

            {/* Action Buttons */}
            <button
                onClick={handleUpload}
                className="w-full bg-blue-500 text-white py-2 rounded-lg mb-3 hover:bg-blue-600 transition"
            >
                Upload CV
            </button>

            {savedCV && (
                <>
                    <button
                        onClick={handleDownload}
                        className="w-full bg-green-500 text-white py-2 rounded-lg mb-3 hover:bg-green-600 transition"
                    >
                        Download CV
                    </button>
                    <button
                        onClick={handleDelete}
                        className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                    >
                        Delete CV
                    </button>
                </>
            )}

            {/* Message Display */}
            {message && (
                <p
                    className={`mt-4 text-center p-2 rounded-lg ${messageType === "success"
                            ? "bg-green-500 text-white"
                            : messageType === "error"
                                ? "bg-red-500 text-white"
                                : "bg-yellow-500 text-gray-900"
                        }`}
                >
                    {message}
                </p>
            )}
        </div>
    );
};

export default CurriculumVitae;
