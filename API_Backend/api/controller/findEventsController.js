//@Author - RajKumar B00849566

const findEventModel = require('../models/findEventModel');

exports.find_events = (req, res) => {
    findEventModel.findEvents(req.params.userId, (err, succ) => {
        if (err) {
            res.send('error occured -- controller');
        }
        res.json(succ)
    })
}