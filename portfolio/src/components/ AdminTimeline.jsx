import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const API_URL = import.meta.env.VITE_API_URL;

const AdminTimeline = () => {
    const [timelines, setTimelines] = useState([]);
    const [formData, setFormData] = useState({ from: "", to: "", title: "", description: "" });
    const [loading, setLoading] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchTimelines();
    }, []);

    const fetchTimelines = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/timeline`);
            setTimelines(response.data);
        } catch (error) {
            setMessage("⚠️ Failed to fetch timelines.");
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (editingId) {
                await axios.patch(`${API_URL}/api/timeline/${editingId}`, formData);
                setMessage("✅ Timeline updated successfully!");
            } else {
                await axios.post(`${API_URL}/api/timeline`, formData);
                setMessage("✅ Timeline added successfully!");
            }
            fetchTimelines();
            setFormData({ from: "", to: "", title: "", description: "" });
            setEditingId(null);
        } catch (error) {
            setMessage("❌ Failed to save timeline.");
        } finally {
            setLoading(false);
            setTimeout(() => setMessage(""), 2000);
        }
    };

    const handleEdit = (timeline) => {
        setFormData({
            from: timeline.from.split("T")[0],
            to: timeline.to ? timeline.to.split("T")[0] : "",
            title: timeline.title,
            description: timeline.description,
        });
        setEditingId(timeline._id);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this timeline entry?")) return;
        try {
            await axios.delete(`${API_URL}/api/timeline/${id}`);
            setMessage("✅ Timeline deleted successfully!");
            fetchTimelines();
        } catch (error) {
            setMessage("❌ Failed to delete timeline.");
        } finally {
            setTimeout(() => setMessage(""), 2000);
        }
    };

    return (
        <div>
            {/* Status Message */}
            {message && (
                <motion.p
                    className={`text-center p-2 rounded-lg text-sm font-medium ${message.startsWith("✅") ? "bg-green-500" : "bg-red-500"}`}
                    animate={{ opacity: [0, 1], y: [-5, 0] }}
                    transition={{ duration: 0.3 }}
                >
                    {message}
                </motion.p>
            )}

            {/* Timeline Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-300 font-medium">From</label>
                    <input
                        type="date"
                        name="from"
                        value={formData.from}
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-300 font-medium">To (Leave empty for Present)</label>
                    <input
                        type="date"
                        name="to"
                        value={formData.to}
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-gray-300 font-medium">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-300 font-medium">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg bg-gray-700 text-white resize-none focus:ring-2 focus:ring-blue-500"
                        rows="3"
                        required
                    ></textarea>
                </div>

                {/* Submit Button */}
                <motion.button
                    type="submit"
                    whileHover={!loading ? { scale: 1.05 } : {}}
                    whileTap={!loading ? { scale: 0.95 } : {}}
                    className={`w-full text-white py-3 rounded-lg font-medium transition ${loading || !formData.title.trim() ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
                    disabled={loading || !formData.title.trim()}
                >
                    {loading ? "Saving..." : editingId ? "Update Timeline" : "Add Timeline"}
                </motion.button>
            </form>

            {/* Timeline List */}
            {timelines.length > 0 && (
                <ul className="space-y-4 mt-6">
                    {timelines.map((timeline) => (
                        <li key={timeline._id} className="bg-gray-700 p-4 rounded-lg">
                            <h4 className="text-lg font-semibold">{timeline.title}</h4>
                            <p className="text-sm text-gray-400">
                                {new Date(timeline.from).toLocaleDateString()} - {timeline.to ? new Date(timeline.to).toLocaleDateString() : "Present"}
                            </p>
                            <p className="mt-2 text-gray-300">{timeline.description}</p>
                            <div className="flex justify-end space-x-2 mt-3">
                                <motion.button
                                    onClick={() => handleEdit(timeline)}
                                    className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white text-sm rounded-md"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Edit
                                </motion.button>
                                <motion.button
                                    onClick={() => handleDelete(timeline._id)}
                                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded-md"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Delete
                                </motion.button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AdminTimeline;
