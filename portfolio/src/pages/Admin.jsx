import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // Icons for the sidebar toggle
import AdminAboutMe from "../components/AdminAboutme";
import CurriculumVitae from "../components/CurriculumVitae";
import AdminSocialLinks from "../components/AdminSocialLinks";
import AdminTimeline from "../components/ AdminTimeline";
import SkillsAdmin from "../components/AdminSkills";

const Admin = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Refs for each section
    const cvRef = useRef(null);
    const aboutRef = useRef(null);
    const socialLinksRef = useRef(null);
    const timelineRef = useRef(null);
    const skillsRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login"); // Redirect if no token
        } else {
            setIsAuthenticated(true);
        }
    }, [navigate]);

    if (!isAuthenticated) return null; // Prevents rendering if not authenticated

    // Function to scroll to a section smoothly
    const scrollToSection = (ref) => {
        if (ref.current) {
            window.scrollTo({
                top: ref.current.offsetTop - 50, // Offset for fixed navbar
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex">
            {/* Sidebar - Responsive */}
            <aside className={`fixed top-0 left-0 h-full w-64 bg-gray-800 p-6 shadow-lg transform ${sidebarOpen ? "translate-x-0" : "-translate-x-64"} transition-transform duration-300 md:translate-x-0 z-50`}>
                <h2 className="text-2xl font-bold mb-6">⚙️ Admin Panel</h2>
                <ul className="space-y-4">
                    <li className="hover:text-blue-400 cursor-pointer" onClick={() => scrollToSection(cvRef)}>📄 Manage CV</li>
                    <li className="hover:text-blue-400 cursor-pointer" onClick={() => scrollToSection(aboutRef)}>🛠️ Edit About Me</li>
                    <li className="hover:text-blue-400 cursor-pointer" onClick={() => scrollToSection(socialLinksRef)}>🔗 Social Links</li>
                    <li className="hover:text-blue-400 cursor-pointer" onClick={() => scrollToSection(timelineRef)}>📜 Manage Timeline</li>
                    <li className="hover:text-blue-400 cursor-pointer" onClick={() => scrollToSection(skillsRef)}>💡 Manage Skills</li>
                </ul>
            </aside>

            {/* Sidebar Toggle Button - Visible on Mobile */}
            <button className="md:hidden fixed top-4 left-4 bg-gray-800 text-white p-2 rounded-full shadow-lg z-50" onClick={() => setSidebarOpen(!sidebarOpen)}>
                {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

            {/* Main Content Area */}
            <div className="flex-1 md:ml-64 p-6 md:p-10 space-y-6">
                <h1 className="text-3xl font-bold text-center">⚙️ Admin Dashboard</h1>

                {/* Manage CV Section */}
                <div ref={cvRef} className="w-full bg-gray-800 shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4">📄 Manage CV</h2>
                    <CurriculumVitae />
                </div>

                {/* About Me Section */}
                <div ref={aboutRef} className="w-full bg-gray-800 shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4">🛠️ Edit About Me</h2>
                    <AdminAboutMe />
                </div>

                {/* Social Links Section */}
                <div ref={socialLinksRef} className="w-full bg-gray-800 shadow-lg rounded-lg p-6">
                    <AdminSocialLinks />
                </div>

                {/* Timeline Management Section */}
                <div ref={timelineRef} className="w-full bg-gray-800 shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4">📜 Manage Timeline</h2>
                    <AdminTimeline />
                </div>

                {/* Skills Management Section */}
                <div ref={skillsRef} className="w-full bg-gray-800 shadow-lg rounded-lg p-6">
                    <SkillsAdmin />
                </div>
            </div>
        </div>
    );
};

export default Admin;
