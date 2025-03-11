const express = require("express")

const router = express.Router()

const {
    getAllTimeline,
    singleTimeline,
    deleteTimeline,
    updateTimeline,
    createTimeline
} = require("../controllers/timelineController")

const authenticateAdmin = require("../middleware/authMiddleware");

//GET all timelines
router.get("/", getAllTimeline)

//GET a single timeline
router.get("/:id", singleTimeline)

//POST new timeline
router.post("/", authenticateAdmin, createTimeline)

//PATCH timeline
router.patch("/:id", authenticateAdmin, updateTimeline)

//DELETE timeline
router.delete("/:id", authenticateAdmin, deleteTimeline)


module.exports = router