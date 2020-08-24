const FeedbackObjModel = require("../models/feedbackModel");

// This will call the function from the model.
exports.insertFeedback = (req, res) => {
  FeedbackObjModel._insertFeedback(req, (err, succ) => {
    if (err) {
      res.send(err);
    }
    res.json(succ);
  });
};
