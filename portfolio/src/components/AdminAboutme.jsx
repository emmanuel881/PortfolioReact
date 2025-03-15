import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const API_URL = import.meta.env.VITE_API_URL
const AdminAboutMe = () => {
    const [aboutMe, setAboutMe] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const maxLength = 5000;

    // Fetch the current About Me data
    useEffect(() => {
        const fetchAboutMe = async () => {
            try {
                const response = await fetch(`${API_URL}/api/aboutme`);
                const data = await response.json();
                if (response.ok) {
                    setAboutMe(data.aboutMe);
                } else {
                    setMessage("❌ Failed to fetch About Me content.");
                }
            } catch (error) {
                setMessage("⚠️ An error occurred while fetching data.");
            }
        };

        fetchAboutMe();
    }, []);

    // Handle form submission (update About Me)
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!aboutMe.trim()) return;

        setLoading(true);
        setMessage("");

        try {
            const response = await fetch(`${API_URL}/api/aboutme`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ aboutMe }),
            });

            if (response.ok) {
                setMessage("✅ About Me updated successfully!");
                setTimeout(() => setMessage(""), 2000); // Hide message after 2 seconds
            } else {
                setMessage("❌ Failed to update About Me.");
            }
        } catch (error) {
            setMessage("⚠️ An error occurred while updating.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center bg-gray-900 text-white px-4 py-6">
            <div className="bg-gray-800 shadow-xl rounded-lg p-6 w-full max-w-3xl">
                {/* Status Message */}
                {message && (
                    <motion.p
                        className={`text-center mb-4 p-2 rounded-lg text-sm font-medium ${message.startsWith("✅") ? "bg-green-500" : "bg-red-500"
                            }`}
                        animate={{ opacity: [0, 1], y: [-5, 0] }}
                        transition={{ duration: 0.3 }}
                    >
                        {message}
                    </motion.p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Text Area for About Me */}
                    <div className="relative">
                        <label className="block text-gray-300 font-medium mb-1">About Me Content</label>
                        <textarea
                            className="w-full p-3 border rounded-lg bg-gray-700 text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-600"
                            rows="6"
                            maxLength={maxLength}
                            value={aboutMe}
                            onChange={(e) => setAboutMe(e.target.value)}
                        ></textarea>
                        {/* Character Count */}
                        <span className="absolute right-2 bottom-2 text-gray-400 text-xs">
                            {aboutMe.length} / {maxLength}
                        </span>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                        type="submit"
                        whileHover={!loading ? { scale: 1.05 } : {}}
                        whileTap={!loading ? { scale: 0.95 } : {}}
                        className={`w-full text-white py-3 rounded-lg transition ${loading || !aboutMe.trim()
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600"
                            }`}
                        disabled={loading || !aboutMe.trim()}
                    >
                        {loading ? "Updating..." : "Update About Me"}
                    </motion.button>
                </form>
            </div>
        </div>
    );
};

export default AdminAboutMe;
