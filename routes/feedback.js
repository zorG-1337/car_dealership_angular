const express = require("express");
const controller = require("../controllers/feedback")
const router = express.Router();

router.post("/create_feedback", controller.createFeedback)

module.exports = router