import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminAboutMe from "../components/AdminAboutme";
import CurriculumVitae from "../components/CurriculumVitae";
import AdminSocialLinks from "../components/AdminSocialLinks";
import AdminTimeline from "../components/ AdminTimeline"; // Ensure correct import
import SkillsAdmin from "../components/AdminSkills";

const Admin = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login"); // Redirect if no token
        } else {
            setIsAuthenticated(true);
        }
    }, [navigate]);

    if (!isAuthenticated) return null; // Prevents rendering if not authenticated

    return (
        <div className="min-h-screen bg-gray-900 text-white px-4 sm:px-6 py-8 flex flex-col items-center">
            <h1 className="text-3xl font-bold text-center mb-6">⚙️ Admin Dashboard</h1>
            <div className="w-full space-y-6 sm:max-w-4xl">
                {/* Manage CV Section */}
                <div className="w-full bg-gray-800 shadow-lg rounded-lg p-4 sm:p-6">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-center">📄 Manage CV</h2>
                    <CurriculumVitae />
                </div>

                {/* About Me Section */}
                <div className="w-full bg-gray-800 shadow-lg rounded-lg p-4 sm:p-6">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-center">🛠️ Edit About Me</h2>
                    <AdminAboutMe />
                </div>

                {/* Social Links Section */}
                <AdminSocialLinks />

                {/* Timeline Management Section */}
                <div className="w-full bg-gray-800 shadow-lg rounded-lg p-4 sm:p-6">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-center">📜 Manage Timeline</h2>
                    <AdminTimeline />
                </div>

                {/* Skills Management Section */}
                <div className="w-full bg-gray-800 shadow-lg rounded-lg p-4 sm:p-6">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-center">💡 Manage Skills</h2>
                    <SkillsAdmin />
                </div>
            </div>
        </div>
    );
};

export default Admin;
