//Author - Jigar Makwana B00842568
const UserMngObjModel = require("../models/userModel");
const emailObj = require("./emailController");

exports.getUserDetails = (req, res) => {
  UserMngObjModel._getUserDetails((err, succ) => {
    if (err) {
      res.send(err);
    }
    res.json(succ);
  });
};

exports.getSpecificUser = (req, res) => {
  UserMngObjModel._getSpecificUser(req.body, (err, succ) => {
    if (err) {
      res.send(err);
    }
    res.json(succ);
  });
};

//Author - Jigar Makwana B00842568
exports.loginUser = (req, res) => {
  UserMngObjModel._loginUser(req.body, (err, succ) => {
    if (err) {
      res.send(err);
    }
    res.json(succ);
  });
};

//Author - Jigar Makwana B00842568
exports.registerUser = (req, res) => {
  UserMngObjModel._registerUser(req.body, (err, succ) => {
    if (err) {
      res.send(err);
    }
    res.send(succ);
  });
};

//Author - Jigar Makwana B00842568
exports.forgotPassword = (req, res) => {
  emailObj.forgotPassword(req.body, (err, succ) => {
    if (err) {
      res.send(err);
    }
    res.send(succ);
  });
};

//Author - Jigar Makwana B00842568
exports.receiveNewPassword = (req, res) => {
  emailObj.receiveNewPassword(req, (err, succ) => {
    if (err) {
      res.send(err);
    }
    res.send(succ);
  });
};

//Author - Jigar Makwana B00842568
exports.updateUserDetail = (req, res) => {
  UserMngObjModel._updateUserDetail(
    req.params.userId,
    req.body,
    (err, succ) => {
      if (err) {
        res.send("error occured -- controller");
      }
      res.json(succ);
    }
  );
};

// Author Nishant Amoli - B00835717
exports.updateUserProfile = (req, res) => {
  UserMngObjModel._updateUserProfile(
    req.params.userId,
    req.body,
    (err, succ) => {
      if (err) {
        res.send("error occured -- controller");
      }
      res.json(succ);
    }
  );
};

//Author - Jigar Makwana B00842568
exports.deleteUser = (req, res) => {
  UserMngObjModel._deleteUser(req.params.userId, (err, succ) => {
    if (err) {
      res.send("error occured -- controller");
    }
    res.json(succ);
  });
};
// Author Breej - B00843525
exports.verifyId1 = (req, res) => {
  UserMngObjModel._putVerifyId(req.params.userId, req.body, (err, succ) => {
    if (err) {
      res.send("error occured -- controller");
    }
    res.json(succ);
  });
};
