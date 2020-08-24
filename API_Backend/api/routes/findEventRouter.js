//@Author - RajKumar B00849566

const express = require("express");
const findEventController = require('../controller/findEventsController');
const router = express.Router();

//GET all the requests that match the search
router.get("/findevents/:userId", findEventController.find_events)

module.exports = router;