import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import dayjs from "dayjs";

const API_URL = import.meta.env.VITE_API_URL
const Timeline = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTimeline = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/timeline`);
                setEvents(response.data);
            } catch (err) {
                setError("Failed to load timeline data");
            } finally {
                setLoading(false);
            }
        };

        fetchTimeline();
    }, []);

    // Function to format the date
    const formatDate = (dateString) => {
        return dateString ? dayjs(dateString).format("MMMM YYYY") : "Present";
    };

    return (
        <section className="max-w-4xl mx-auto p-6 bg-gray-100" id="education">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">My Journey</h2>

            {loading && <p className="text-center text-gray-500">Loading timeline...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            {!loading && !error && (
                <div className="relative border-l-4 border-blue-500 pl-6">
                    {events.map((event, index) => (
                        <motion.div
                            key={event._id}
                            className="mb-10 relative bg-white shadow-lg p-6 rounded-lg"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.3 }}
                            viewport={{ once: true }}
                        >
                            <div className="absolute -left-5 top-5 w-6 h-6 bg-blue-500 rounded-full border-4 border-white"></div>
                            <p className="text-sm text-gray-500 font-medium">
                                {formatDate(event.from)} - {formatDate(event.to)}
                            </p>
                            <h3 className="text-2xl font-semibold text-gray-800 mt-1">{event.title}</h3>
                            <p className="text-gray-600 mt-2">{event.description}</p>
                        </motion.div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default Timeline;
