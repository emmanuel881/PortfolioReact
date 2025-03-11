const express = require("express")

const router = express.Router()


const { updateAboutme, createAboutme, getAboutme } = require("../controllers/AboutmeController")

//GET about me
router.get("/", getAboutme)

//POST:create about
router.post("/", createAboutme)

//PATCH: update about
router.patch("/", updateAboutme)


module.exports = router
