import { Outlet, useNavigate } from "react-router-dom";

const AdminLayout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove auth token
        navigate("/"); // Redirect to home page
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-900 text-white">
            {/* Navbar */}
            <nav className="bg-gray-800 py-4 px-6 flex items-center shadow-md">
                <div className="ml-auto">
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            {/* Page Content */}
            <div className="flex-grow flex items-center justify-center px-6 py-8">
                <div className="w-full max-w-5xl">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
