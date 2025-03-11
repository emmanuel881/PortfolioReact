const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");

// Import routes
const timelineRoute = require("./routes/timelineRouter");
const aboutmeRoute = require("./routes/aboutRoutes");
const imageRoute = require("./routes/imageRoutes");
const skillRoute = require("./routes/skillsRoutes");
const socialLinksRoutes = require("./routes/socialLinksRoutes");
const mailRoute = require("./routes/mailRoutes");
const downloadCVRoutes = require("./routes/downloadCVRoutes");
const authRoute = require("./routes/authRoutes");

// Environment variables
const PORT = process.env.PORT || 4000; // Default to 4000 if not set
const MONGODB_URL = process.env.MONGODB_URL;

// App instance
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/timeline", timelineRoute);
app.use("/api/aboutme", aboutmeRoute);
app.use("/api/imageupload", imageRoute);
app.use("/api/skills", skillRoute);
app.use("/api/sendMail", mailRoute);
app.use("/api/cv", downloadCVRoutes);
app.use("/api/social-links", socialLinksRoutes);
app.use("/api/auth", authRoute);

// Connect to DB & Start Server
mongoose
    .connect(MONGODB_URL)
    .then(() => {
        console.log("Connected to Database");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Database connection error:", error);
        process.exit(1); // Stop server if DB connection fails
    });
