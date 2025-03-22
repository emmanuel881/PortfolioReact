import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const SkillsAdmin = () => {
    const [skills, setSkills] = useState([]);
    const [formData, setFormData] = useState({ title: "", description: "", percentage: "" });
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/skills`);
            setSkills(response.data);
        } catch (error) {
            console.error("Error fetching skills:", error);
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
                await axios.patch(`${API_URL}/api/skills/${editingId}`, formData);
            } else {
                await axios.post(`${API_URL}/api/skills`, formData);
            }
            fetchSkills();
            setFormData({ title: "", description: "", percentage: "" });
            setEditingId(null);
        } catch (error) {
            console.error("Error saving skill:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        setDeletingId(id);
        setSkills(prevSkills => prevSkills.filter(skill => skill._id !== id));

        setTimeout(async () => {
            try {
                await axios.delete(`${API_URL}/api/skills/${id}`);
                fetchSkills();
            } catch (error) {
                console.error("Error deleting skill:", error);
            } finally {
                setDeletingId(null);
            }
        }, 500);
    };

    const handleEdit = (skill) => {
        setFormData({ title: skill.title, description: skill.description, percentage: skill.percentage });
        setEditingId(skill._id);
    };

    return (
        <div className="space-y-6 p-6 bg-gray-900 text-white min-h-screen flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-6">⚙️ Manage Skills</h2>

            <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-2xl space-y-4">
                <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Skill Title" required className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500" />
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500"></textarea>
                <input type="number" name="percentage" value={formData.percentage} onChange={handleChange} placeholder="Proficiency (%)" min="0" max="100" required className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500" />
                <button type="submit" className="w-full py-3 rounded-lg text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition duration-300" disabled={loading}>
                    {loading ? "Processing..." : editingId ? "Update Skill" : "Add Skill"}
                </button>
            </form>

            <div className="mt-8 w-full max-w-3xl">
                <h3 className="text-2xl font-semibold mb-4 text-center">📜 Skills List</h3>
                <div className="space-y-4">
                    {skills.map((skill) => (
                        <div key={skill._id} className={`bg-gray-700 p-5 rounded-lg shadow-lg flex flex-col sm:flex-row justify-between items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 transition-all duration-500 ${deletingId === skill._id ? "opacity-0 scale-95 h-0 p-0" : "opacity-100 scale-100 h-auto"}`}>
                            <div className="flex-1">
                                <h4 className="text-lg font-semibold">{skill.title}</h4>
                                <p className="text-sm text-gray-300">{skill.description}</p>
                                <p className="text-sm text-gray-400">Proficiency: {skill.percentage}%</p>
                            </div>
                            <div className="flex space-x-3">
                                <button onClick={() => handleEdit(skill)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300">Edit</button>
                                <button onClick={() => handleDelete(skill._id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300" disabled={deletingId === skill._id}>
                                    {deletingId === skill._id ? "Deleting..." : "Delete"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SkillsAdmin;
