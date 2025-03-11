const mongoose = require("mongoose")

const socialLinksSchema = new mongoose.Schema({
    linkedIn: {
        type: String,
        default: "https://ke.linkedin.com/",
        required: true
    },
    instagram: {
        type: String,
        default: "https://www.instagram.com/",
        required: true
    },
    facebook: {
        type: String,
        default: "https://www.facebook.com/",
        required: true
    },
    twitterX: {
        type: String,
        default: "https://x.com/i/flow/login",
        required: true
    }
})

const socialLinks = mongoose.model("socialLink", socialLinksSchema)

module.exports = socialLinks