const EventObjModel = require('../models/requestsModel');

exports.get_events_and_requests = (req, res) => {
    EventObjModel.getEventsAndRequests(req.params.userId, (err, succ) => {
        if (err) {
            res.send('error occured -- controller');
        }
        res.json(succ)
    })
}
// Author Breej - B00843525
exports.post_requests = (req, res) => {
    EventObjModel.postRequestedEvent(req.params.userId, req.body, (err, succ) => {
        if (err) {
            console.log("err", err);
            res.json(err);
        }
        if (succ) {
            console.log("succ", succ)
            res.json(succ)
        }


    })
}