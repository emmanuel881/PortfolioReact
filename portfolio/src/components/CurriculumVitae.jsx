import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL

const CurriculumVitae = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [savedCV, setSavedCV] = useState(null);
    const [message, setMessage] = useState("");

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
                setMessage("Error checking saved CV.");
            }
        };

        checkSavedCV();
    }, []);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setMessage("Please select a file to upload.");
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
            setMessage(data.message || "CV uploaded successfully!");
            setSavedCV(selectedFile.name); // Update saved CV
            setSelectedFile(null); // Clear selected file
        } catch (error) {
            setMessage("Upload failed. Please try again.");
        }
    };

    const handleDownload = async () => {
        try {
            const response = await fetch(`${API_URL}/api/cv/download-cv`);
            if (response.status === 404) {
                setMessage("CV not found.");
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
            setMessage("Download failed.");
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`${API_URL}/api/cv/delete-cv`, {
                method: "DELETE",
            });
            const data = await response.json();
            setMessage(data.message || "CV deleted successfully!");
            setSavedCV(null); // Clear saved CV display
        } catch (error) {
            setMessage("Delete failed.");
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-xl rounded-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Manage Your CV</h2>

            {/* Show Saved CV if Exists */}
            {savedCV ? (
                <div className="mb-4 p-3 bg-gray-100 rounded-lg text-gray-700">
                    <p className="font-medium">CV uploaded is named: {savedCV}</p>
                </div>
            ) : (
                <p className="mb-4 text-gray-500">No CV saved.</p>
            )}

            {/* File Upload Section */}
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Select CV File:</label>
                <div className="relative flex items-center border border-gray-300 rounded-lg p-2 bg-gray-50">
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 w-full cursor-pointer"
                    />
                    <span className="text-gray-600 text-sm truncate">
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
                <p className="mt-4 text-center text-gray-700 bg-gray-100 p-2 rounded-lg">{message}</p>
            )}
        </div>
    );
};

export default CurriculumVitae;
