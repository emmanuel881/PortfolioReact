import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const ProfileDetails = () => {
    const [aboutMe, setAboutMe] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [downloadMessage, setDownloadMessage] = useState(""); // State for download messages
    const [isDownloading, setIsDownloading] = useState(false); // State to track download progress

    useEffect(() => {
        const fetchAboutMe = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/aboutme"); // Adjust if needed
                setAboutMe(response.data.aboutMe);
            } catch (err) {
                setError("Failed to load About Me");
            } finally {
                setLoading(false);
            }
        };

        fetchAboutMe();
    }, []);

    const handleDownload = async () => {
        try {
            setIsDownloading(true);
            setDownloadMessage("");

            const response = await fetch("http://localhost:4000/api/cv/download-cv");

            if (response.status === 404) {
                setDownloadMessage("CV not found.");
                setIsDownloading(false);
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

            setDownloadMessage("Download successful!");
        } catch (error) {
            setDownloadMessage("Download failed. Please try again.");
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <section id="profile" className="py-16 px-6 md:px-12 lg:px-24 bg-gray-100">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12">
                About Me
            </h2>

            <div className="flex flex-col-reverse md:flex-row items-center gap-10">
                {/* Text Content */}
                <motion.div
                    className="md:w-1/2 text-center md:text-left"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    {loading ? (
                        <p className="text-lg text-gray-500">Loading...</p>
                    ) : error ? (
                        <p className="text-lg text-red-500">{error}</p>
                    ) : (
                        <p className="text-lg text-gray-700 leading-relaxed">{aboutMe}</p>
                    )}
                    <motion.button
                        className="bg-blue-500 px-6 py-3 text-white font-bold rounded-lg hover:bg-blue-600 transition mt-6"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleDownload}
                        disabled={isDownloading}
                    >
                        {isDownloading ? "Downloading..." : "Download CV"}
                    </motion.button>
                    {downloadMessage && (
                        <p className={`mt-3 text-sm ${downloadMessage.includes("failed") ? "text-red-500" : "text-green-600"}`}>
                            {downloadMessage}
                        </p>
                    )}
                </motion.div>

                {/* Image Container */}
                <motion.div
                    className="md:w-1/2 flex justify-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <img
                        src="/profile.jpeg"
                        alt="Profile Image"
                        className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full shadow-lg border-4 border-white"
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default ProfileDetails;
