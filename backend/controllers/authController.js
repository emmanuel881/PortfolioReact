const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
require("dotenv").config();

// Generate web token
const generateToken = (user) => {
    try {
        return jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
    } catch (error) {
        console.error("JWT Error:", error);
        return null; // Return null if token generation fails
    }
};

// Admin login
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user || user.role !== "admin") {
            return res.status(401).json({ message: "Unauthorized: Invalid credentials" });
        }

        const isMatch = await argon2.verify(user.password, password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = generateToken(user);
        if (!token) {
            return res.status(500).json({ message: "Error generating token" });
        }

        res.json({ token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Register Admin (Only for first-time setup, remove after use)
const registerAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        const newUser = await User.create({ email, password, role: "admin" });

        res.status(201).json({ message: "Admin created successfully" });
    } catch (error) {
        console.error("Error registering admin:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { loginAdmin, registerAdmin };
