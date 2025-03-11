const mongoose = require("mongoose")

const skillSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 5000
    },
    percentage: {
        type: Number,
        min: 0,
        max: 100,
        required: true
    }
}, { timestamps: true })

const Skills = mongoose.model("Skills", skillSchema)

module.exports = Skills