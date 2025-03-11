const mongoose = require("mongoose")

const timelineSchema = new mongoose.Schema({
    from: {
        type: Date,
        required: true
    },
    to: {
        type: Date,
        default: null,
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 5000
    },
}, { timestamps: true })

const Timeline = mongoose.model("Timeline", timelineSchema)

module.exports = Timeline