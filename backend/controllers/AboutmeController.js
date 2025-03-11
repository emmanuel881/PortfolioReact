
const Aboutme = require("../models/aboutmeModel")

//post about-me
const createAboutme = async (req, res) => {
    const { aboutMe } = req.body

    //add to DB
    try {
        const aboutme = await Aboutme.create({ aboutMe })

        return res.status(200).json(aboutme)
    } catch (error) {
        return res.status().json({ error: error.message })
    }
}

// Get About Me
const getAboutme = async (req, res) => {
    try {
        const aboutme = await Aboutme.findOne(); // Fetch the first document
        if (!aboutme) {
            return res.status(404).json({ error: "No about me found" });
        }
        return res.status(200).json(aboutme);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

//update about-me
const updateAboutme = async (req, res) => {
    const { aboutMe } = req.body;

    try {
        // Find the first (and only) About Me entry and update it
        const updatedAboutme = await Aboutme.findOneAndUpdate(
            {}, // Find the first document
            { aboutMe },
            { new: true, upsert: true, runValidators: true } // Create if not exists
        );

        return res.status(200).json(updatedAboutme);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    updateAboutme,
    createAboutme,
    getAboutme,
}
