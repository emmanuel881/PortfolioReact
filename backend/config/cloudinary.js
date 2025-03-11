require("dotenv").config()

const cloudinary = require("cloudinary").v2

const CLOUD_NAME = process.env.CLOUDINARY_NAME
const KEY = process.env.CLOUDINARY_API_KEY
const SECRET = process.env.CLOUDINARY_SECRET

cloudinary.config({
    cloud_name: CLOUD_NAME,
})