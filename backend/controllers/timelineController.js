const Timeline = require("../models/timelineModel");
const mongoose = require("mongoose");

// Get all timelines
const getAllTimeline = async (req, res) => {
    const timelines = await Timeline.find({}).sort({ from: 1 });
    return res.status(200).json(timelines);
};

// Create a timeline
const createTimeline = async (req, res) => {
    let { from, to, title, description } = req.body;

    // Convert "Present" to null
    if (to === "Present") {
        to = null;
    }

    try {
        const timeline = await Timeline.create({ from, to, title, description });
        res.status(201).json(timeline);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a single timeline
const singleTimeline = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid ID" });
    }

    const timeline = await Timeline.findById(id);
    if (!timeline) {
        return res.status(404).json({ error: "No such timeline" });
    }

    return res.status(200).json(timeline);
};

// Delete a timeline
const deleteTimeline = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid ID" });
    }

    const timeline = await Timeline.findOneAndDelete({ _id: id });
    if (!timeline) {
        return res.status(404).json({ error: "Timeline not found" });
    }

    return res.status(200).json({ message: "Timeline deleted successfully" });
};

// Update a timeline
const updateTimeline = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid ID" });
    }

    const timeline = await Timeline.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });

    if (!timeline) {
        return res.status(400).json({ error: "No timeline found, update failed" });
    }

    return res.status(200).json(timeline);
};

module.exports = { getAllTimeline, singleTimeline, deleteTimeline, updateTimeline, createTimeline };
