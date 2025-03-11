const Skills = require("../models/skillsModel")
const mongoose = require("mongoose")

//GET all skills
const getAllSkills = async (req, res) => {
    const skills = await Skills.find({}).sort({ createdAt: -1 })

    return res.status(200).json(skills)
}

//GET a single skill

const getSkill = async (req, res) => {
    const { id } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "invalid id format" })
    }

    const skill = await Skills.findById(id)

    //check if id was found 
    if (!skill) {
        return res.status(404).json({ error: "No such skill" })
    }

    return res.status(200).json(skill)
}

//PATCh update skill
const updateSkill = async (req, res) => {
    const { id } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "invalid id format" })
    }

    const skill = await Skills.findOneAndDelete({ _id: id })
}

//create skill 
const createSkill = async (req, res) => {
    const { title, description, percentage } = req.body


    //create skill
    try {
        const skills = await Skills.create({ title, description, percentage })
        res.status(200).json(skills)
    } catch (error) {
        return res.status(500).json({ error: error })
    }


}

//DELETE skill
const deleteSkill = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid ID" });
    }

    const skill = await Skills.findOneAndDelete({ _id: id })

    if (!skill) {
        return res.status(404).json({ error: "Skill not found" })
    }

    return res.status(200).json(skill)
}

module.exports = {
    createSkill, updateSkill, getSkill, getAllSkills, deleteSkill
}