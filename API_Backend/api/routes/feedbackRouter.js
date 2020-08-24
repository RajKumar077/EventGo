const express = require("express");
const feedbackController = require("../controller/feedbackController");
const router = express.Router();

router.post("/insertFeedback", feedbackController.insertFeedback);

module.exports = router;
