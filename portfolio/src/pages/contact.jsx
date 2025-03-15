import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL
const Contact = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [popup, setPopup] = useState({ visible: false, email: "" });

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            message: "",
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(3, "At least 3 characters")
                .required("Name is required"),
            email: Yup.string()
                .matches(
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    "Invalid email format"
                )
                .required("Email is required"),
            message: Yup.string()
                .min(10, "At least 10 characters")
                .required("Message is required"),
        }),
        onSubmit: async (values, { resetForm }) => {
            setLoading(true);

            try {
                const response = await fetch(`${API_URL}/api/sendMail`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values),
                });

                const data = await response.json();

                if (response.ok) {
                    setPopup({ visible: true, email: values.email });
                    resetForm();
                } else {
                    alert(data.error || "Failed to send message.");
                }
            } catch (error) {
                alert("An error occurred. Try again later.");
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4"
        >
            <div className="bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-lg">
                {/* Back Button (Now Inside the Form Container) */}
                <button
                    onClick={() => navigate("/")}
                    className="mb-4 bg-blue-500 px-4 py-2 rounded-lg text-white hover:bg-blue-600 transition"
                >
                    Back
                </button>

                <h2 className="text-2xl font-semibold text-center">📩 Contact Me</h2>

                <form onSubmit={formik.handleSubmit} className="mt-4 space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-gray-300 font-medium">Name</label>
                        <input
                            type="text"
                            name="name"
                            className={`w-full p-3 border rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 ${formik.touched.name && formik.errors.name
                                ? "border-red-500"
                                : "border-gray-600"
                                }`}
                            placeholder="Your Name"
                            {...formik.getFieldProps("name")}
                        />
                        {formik.touched.name && formik.errors.name && (
                            <p className="text-red-400 text-sm mt-1">{formik.errors.name}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-gray-300 font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            className={`w-full p-3 border rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 ${formik.touched.email && formik.errors.email
                                ? "border-red-500"
                                : "border-gray-600"
                                }`}
                            placeholder="Your Email"
                            {...formik.getFieldProps("email")}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <p className="text-red-400 text-sm mt-1">{formik.errors.email}</p>
                        )}
                    </div>

                    {/* Message */}
                    <div>
                        <label className="block text-gray-300 font-medium">Message</label>
                        <textarea
                            name="message"
                            rows="4"
                            className={`w-full p-3 border rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 ${formik.touched.message && formik.errors.message
                                ? "border-red-500"
                                : "border-gray-600"
                                }`}
                            placeholder="Your Message"
                            {...formik.getFieldProps("message")}
                        ></textarea>
                        {formik.touched.message && formik.errors.message && (
                            <p className="text-red-400 text-sm mt-1">{formik.errors.message}</p>
                        )}
                    </div>

                    {/* Submit Button with Loader */}
                    <motion.button
                        type="submit"
                        whileHover={!loading ? { scale: 1.05 } : {}}
                        whileTap={!loading ? { scale: 0.95 } : {}}
                        className={`w-full text-white py-3 rounded-lg transition flex items-center justify-center gap-2 ${loading
                            ? "bg-indigo-600 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600"
                            }`}
                        disabled={loading}
                    >
                        {loading && (
                            <svg
                                className="mr-2 size-5 motion-safe:animate-spin text-white"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v8H4z"
                                ></path>
                            </svg>
                        )}
                        {loading ? "Sending..." : "Send Message"}
                    </motion.button>
                </form>
            </div>

            {/* Success Popup */}
            {popup.visible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="bg-gray-800 p-6 rounded-lg text-center shadow-xl max-w-sm"
                    >
                        <h3 className="text-lg font-semibold text-green-400">🎉 Message Sent!</h3>
                        <p className="text-gray-300 mt-2">
                            You will be contacted at{" "}
                            <span className="text-blue-400">{popup.email}</span>
                        </p>
                        <button
                            onClick={() => navigate("/")}
                            className="mt-4 bg-blue-500 px-4 py-2 rounded-lg text-white hover:bg-blue-600 transition"
                        >
                            OK
                        </button>
                    </motion.div>
                </div>
            )}
        </motion.div>
    );
};

export default Contact;
