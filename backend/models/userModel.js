const mongoose = require("mongoose");
const argon2 = require("argon2");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "admin"
    }
});

// Hash password before saving, only if it's modified
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        this.password = await argon2.hash(this.password);
        next();
    } catch (err) {
        next(err);
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
