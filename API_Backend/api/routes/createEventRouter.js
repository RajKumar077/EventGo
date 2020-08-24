//@Author - RajKumar B00849566

const express = require("express");
const createController = require('../controller/createEventController');
const router = express.Router();

//GET events
router.get("/getHistory/:userId", createController.get_User_EventsHistory)
//POST events
router.post("/postEvent/:userId", createController.post_User_Event)
//UPDATE events
router.put("/updateEvent/:userId", createController.update_User_Event)
//DELETE events
router.delete("/deleteevent/:userId/:eventid", createController.delete_User_Event)

router.get("/test/", createController.get_test)

module.exports = router;