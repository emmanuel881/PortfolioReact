const express = require("express")
const authenticateAdmin = require("../middleware/authMiddleware");

const router = express.Router()

const {
    createSkill,
    updateSkill,
    getSkill,
    getAllSkills,
    deleteSkill
} = require("../controllers/skillsController")

//get all the skills
router.get("/", getAllSkills)

//get as single skill
router.get("/:id", getSkill)

//create skill
router.post("/", authenticateAdmin, createSkill)

//delete skill
router.delete("/:id", authenticateAdmin, deleteSkill)

//update skill
router.patch("/:id", authenticateAdmin, updateSkill)


module.exports = router