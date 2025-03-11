const express = require("express")

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
router.post("/", createSkill)

//delete skill
router.delete("/:id", deleteSkill)

//update skill
router.patch("/:id", updateSkill)


module.exports = router