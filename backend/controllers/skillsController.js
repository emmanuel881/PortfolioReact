const Skills = require("../models/skillsModel");
const mongoose = require("mongoose");

// GET all skills
const getAllSkills = async (req, res) => {
    try {
        const skills = await Skills.find({}).sort({ createdAt: -1 });
        return res.status(200).json(skills);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// GET a single skill
const getSkill = async (req, res) => {
    const { id } = req.params.id; // Fix: Use params instead of body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }

    try {
        const skill = await Skills.findById(id);

        if (!skill) {
            return res.status(404).json({ error: "No such skill found" });
        }

        return res.status(200).json(skill);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// PATCH update skill
const updateSkill = async (req, res) => {
    const { id } = req.params; // Fix: Use params instead of body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }

    try {
        const skill = await Skills.findByIdAndUpdate(id, req.body, { new: true });

        if (!skill) {
            return res.status(404).json({ error: "Skill not found" });
        }

        return res.status(200).json(skill);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// POST create skill
const createSkill = async (req, res) => {
    const { title, description, percentage } = req.body;

    try {
        const skill = await Skills.create({ title, description, percentage });
        return res.status(201).json(skill);
    } catch (error) {
        return res.status(500).json({ error: error.message }); // Fix: Return error.message
    }
};

// DELETE skill
const deleteSkill = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }

    try {
        const skill = await Skills.findByIdAndDelete(id);

        if (!skill) {
            return res.status(404).json({ error: "Skill not found" });
        }

        return res.status(200).json({ message: "Skill deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createSkill,
    updateSkill,
    getSkill,
    getAllSkills,
    deleteSkill,
};
