const express = require("express")

const router = express.Router()

const {
    getAllTimeline,
    singleTimeline,
    deleteTimeline,
    updateTimeline,
    createTimeline
} = require("../controllers/timelineController")



//GET all timelines
router.get("/", getAllTimeline)

//GET a single timeline
router.get("/:id", singleTimeline)

//POST new timeline
router.post("/", createTimeline)

//PATCH timeline
router.patch("/:id", updateTimeline)

//DELETE timeline
router.delete("/:id", deleteTimeline)


module.exports = router