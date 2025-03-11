import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const CircularProgress = ({ skill, value, max = 100, color = "blue", description }) => {
    const percentage = (value / max) * 100;
    const radius = 40;
    const circumference = 2 * Math.PI * radius;

    return (
        <motion.div
            className="flex flex-row items-center bg-white p-6 rounded-2xl shadow-lg w-full gap-6 cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
        >
            {/* Animated Circular Progress */}
            <div className="flex flex-col items-center">
                <svg width="100" height="100" viewBox="0 0 100 100" className="rotate-[-90deg]">
                    {/* Background Circle */}
                    <circle cx="50" cy="50" r={radius} stroke="#e5e7eb" strokeWidth="10" fill="transparent" />

                    {/* Progress Circle */}
                    <motion.circle
                        cx="50"
                        cy="50"
                        r={radius}
                        stroke={color}
                        strokeWidth="10"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        whileInView={{ strokeDashoffset: circumference - (circumference * percentage) / 100 }}
                        transition={{ duration: 3, ease: "easeInOut" }}
                        strokeLinecap="round"
                        viewport={{ once: true }}
                    />
                </svg>

                {/* Animated Percentage */}
                <motion.p
                    className="text-3xl font-bold mt-2"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
                    viewport={{ once: true }}
                >
                    {Math.round(value)}%
                </motion.p>
            </div>

            {/* Skill Title & Description */}
            <div className="flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-gray-900">{skill}</h3>
                <p className="text-gray-600 text-sm mt-1">{description}</p>
            </div>
        </motion.div>
    );
};

export default function SkillSet() {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/skills"); // Adjust if needed
                setSkills(response.data); // Assuming API returns an array of skills
            } catch (err) {
                setError("Failed to load skills");
            } finally {
                setLoading(false);
            }
        };

        fetchSkills();
    }, []);

    return (
        <div className="bg-gray-100 max-w-8xl mx-auto p-10" id="skills">
            {/* Title Section */}
            <motion.h2
                className="text-4xl font-bold text-center text-gray-900 mb-8"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: true }}
            >
                Skills
            </motion.h2>

            {/* Display Loading / Error Message */}
            {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : (
                // Skill Grid
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {skills.map((skill) => (
                        <CircularProgress
                            key={skill._id}
                            skill={skill.title}
                            value={skill.percentage}
                            color="#3B82F6"
                            description={skill.description}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
