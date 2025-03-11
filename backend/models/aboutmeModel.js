const mongoose = require("mongoose")

const aboutmeSchema = new mongoose.Schema({
    aboutMe: {
        type: String,
        maxlength: 5000,
        required: true
    }
}, { timestamps: true })

const Aboutme = mongoose.model("Aboutme", aboutmeSchema)

module.exports = Aboutme