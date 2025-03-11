const express = require("express")

const { loginAdmin, registerAdmin } = require("../controllers/authController")


const router = express.Router()

//admin login
router.post("/login", loginAdmin)

//register admin
//router.post("/register", registerAdmin);

module.exports = router