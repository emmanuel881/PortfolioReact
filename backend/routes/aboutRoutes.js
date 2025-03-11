const express = require("express")

const router = express.Router()
const authenticateAdmin = require("../middleware/authMiddleware");

const { updateAboutme, createAboutme, getAboutme } = require("../controllers/AboutmeController")

//GET about me
router.get("/", getAboutme)

//POST:create about
router.post("/", authenticateAdmin, createAboutme)

//PATCH: update about
router.patch("/", authenticateAdmin, updateAboutme)


module.exports = router
