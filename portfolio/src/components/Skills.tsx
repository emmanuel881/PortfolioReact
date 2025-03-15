import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

// ✅ Ensure TypeScript knows about Vite environment variables
const API_URL = import.meta.env.VITE_API_URL as string;

// ✅ Define Skill type for API response
type Skill = {
    _id: string;
    title: string;
    percentage: number;
    description: string;
};

// ✅ Define a separate type for CircularProgress component props
interface CircularProgressProps {
    title: string;
    value: number;
    max?: number;
    color?: string;
    description?: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ title, value, max = 100, color = "#3B82F6", description }) => {
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
                    <circle cx="50" cy="50" r={radius} stroke="#e5e7eb" strokeWidth="10" fill="transparent" />
                    <motion.circle
                        cx="50"
                        cy="50"
                        r={radius}
                        stroke={color}
                        strokeWidth="10"
                        fill="transparent"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        whileInView={{ strokeDashoffset: circumference - (circumference * percentage) / 100 }}
                        transition={{ duration: 3, ease: "easeInOut" }}
                        strokeLinecap="round"
                        viewport={{ once: true }}
                    />
                </svg>
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
                <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
                <p className="text-gray-600 text-sm mt-1">{description}</p>
            </div>
        </motion.div>
    );
};

export default function SkillSet() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await axios.get<Skill[]>(`${API_URL}/api/skills`);
                setSkills(response.data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load skills");
            } finally {
                setLoading(false);
            }
        };
        fetchSkills();
    }, []);

    return (
        <div className="bg-gray-100 max-w-8xl mx-auto p-10" id="skills">
            <motion.h2
                className="text-4xl font-bold text-center text-gray-900 mb-8"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: true }}
            >
                Skills
            </motion.h2>

            {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {skills.map((skill) => (
                        <CircularProgress
                            key={skill._id}
                            title={skill.title} // ✅ Fix: Use 'title' instead of 'skill'
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
