// Author RajKumar

const express = require("express");
const requestsController = require("../controller/requestsContoroller");
const router = express.Router();

router.get("/getrequests/:userId", requestsController.get_events_and_requests);

router.post("/postrequest/:userId", requestsController.post_requests);

module.exports = router;
