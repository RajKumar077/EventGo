const express = require("express");
const userMngController = require("../controller/UserMngController");
const emailController = require("../controller/emailController");
const router = express.Router();

router.get("/getUsers", userMngController.getUserDetails);
router.post("/getSpecificUser", userMngController.getSpecificUser);
router.post("/login", userMngController.loginUser);
router.post("/registerUser", userMngController.registerUser);
router.post("/forgotPassword", userMngController.forgotPassword);
router.put("/resetpassword/:userId", userMngController.receiveNewPassword);
router.put("/updateUser/:userId", userMngController.updateUserDetail);
router.delete("/deleteUser/:userId", userMngController.deleteUser);
router.put("/updateUserProfile/:userId", userMngController.updateUserProfile);
router.put("/addid/:userId", userMngController.verifyId1);
module.exports = router;
