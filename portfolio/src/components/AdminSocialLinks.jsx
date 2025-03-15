import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const API_URL = import.meta.env.VITE_API_URL

const AdminSocialLinks = () => {
    const [socialLinks, setSocialLinks] = useState({
        linkedIn: "",
        instagram: "",
        facebook: "",
        twitterX: "",
    });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        // Fetch existing social links
        const fetchSocialLinks = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/social-links`);
                const { _id, __v, ...filteredLinks } = response.data; // Remove _id & __v
                setSocialLinks(filteredLinks);
            } catch (error) {
                setMessage("Failed to load social links.");
            } finally {
                setLoading(false);
            }
        };
        fetchSocialLinks();
    }, []);

    const handleChange = (e) => {
        setSocialLinks({ ...socialLinks, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await axios.patch(`${API_URL}/api/social-links`, socialLinks);
            setMessage("✅ Social links updated successfully!");
            setTimeout(() => setMessage(""), 2000); // Hide message after 2 seconds
        } catch (error) {
            setMessage("❌ Failed to update social links.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <motion.div
            className="w-full bg-gray-800 shadow-lg rounded-lg p-4 sm:p-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center">🔗 Paste Your Links Here</h2>

            {loading ? (
                <p className="text-gray-400 text-center">Loading...</p>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Input Fields */}
                    {Object.entries(socialLinks).map(([key, value]) => (
                        <div key={key} className="flex flex-col">
                            <label className="text-sm text-gray-300 capitalize">{key}</label>
                            <input
                                type="url"
                                name={key}
                                value={value}
                                onChange={handleChange}
                                className="mt-1 p-2 rounded-md bg-gray-700 text-white focus:ring focus:ring-blue-500"
                                required
                            />
                        </div>
                    ))}

                    {/* Submit Button */}
                    <motion.button
                        type="submit"
                        className={`w-full text-white font-bold py-2 rounded-lg transition flex justify-center items-center gap-2 ${isSaving
                            ? "bg-gray-500 cursor-not-allowed animate-pulse"
                            : "bg-blue-500 hover:bg-blue-600"
                            }`}
                        whileHover={!isSaving ? { scale: 1.05 } : {}}
                        whileTap={!isSaving ? { scale: 0.95 } : {}}
                        disabled={isSaving}
                    >
                        {isSaving ? "Making Changes..." : "Save Changes"}
                    </motion.button>
                </form>
            )}

            {message && (
                <p className={`mt-4 text-center font-semibold ${message.includes("✅") ? "text-green-400" : "text-red-400"}`}>
                    {message}
                </p>
            )}
        </motion.div>
    );
};

export default AdminSocialLinks;
