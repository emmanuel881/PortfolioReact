import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";


const API_URL = import.meta.env.VITE_API_URL

const AdminLogin = () => {
    const navigate = useNavigate();

    // Validation schema
    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Invalid email format")
            .required("Email is required"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
    });

    // Handle form submission
    const handleLogin = async (values, { setSubmitting, setErrors }) => {
        try {
            const response = await axios.post(`${API_URL}/api/auth/login`, values);
            localStorage.setItem("token", response.data.token);
            navigate("/admin");
        } catch (err) {
            setErrors({ server: err.response?.data?.message || "Invalid credentials" });
        }
        setSubmitting(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg relative">
                {/* Back Button */}
                <button
                    onClick={() => navigate("/")}
                    className="absolute top-4 left-4 text-sm text-gray-400 hover:text-gray-200 transition"
                >
                    ← Back
                </button>

                <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

                <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={validationSchema}
                    onSubmit={handleLogin}
                >
                    {({ isSubmitting, errors }) => (
                        <Form className="space-y-4">
                            {errors.server && <p className="text-red-500 text-center">{errors.server}</p>}

                            <div>
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    className="w-full p-3 bg-gray-700 text-white rounded-lg"
                                />
                                <ErrorMessage name="email" component="p" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div>
                                <Field
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className="w-full p-3 bg-gray-700 text-white rounded-lg"
                                />
                                <ErrorMessage name="password" component="p" className="text-red-500 text-sm mt-1" />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-500 hover:bg-blue-600 py-3 rounded-lg disabled:bg-gray-500"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Logging in..." : "Login"}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default AdminLogin;