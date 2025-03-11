import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const PageNotFound = () => {
    const [count, setCount] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        // Countdown effect
        const interval = setInterval(() => {
            setCount((prev) => prev - 1);
        }, 1000);

        // Redirect after 5 seconds
        const timeout = setTimeout(() => {
            navigate("/");
        }, 5000);

        // Cleanup function
        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [navigate]);

    return (
        <div className="relative flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
            {/* Watermark */}
            <h1 className="absolute text-[20rem] text-gray-800 font-bold opacity-10 select-none">
                404
            </h1>

            {/* Animated Heading */}
            <motion.h1
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="text-4xl font-extrabold text-center"
            >
                Oops! This page does not exist.
            </motion.h1>

            {/* Subtext with fade-in effect */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="mt-4 text-lg text-gray-300"
            >
                Redirecting in <span className="text-blue-400 font-bold">{count}</span> seconds...
            </motion.p>
        </div>
    );
}

export default PageNotFound;
