const jwt = require("jsonwebtoken");

const authenticateAdmin = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1]; // Extract actual token

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = verified;
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
};

module.exports = authenticateAdmin;
