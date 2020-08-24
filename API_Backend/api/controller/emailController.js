var connection = require("../models/DatabaseConn");
const { NULL } = require("mysql2/lib/constants/types");
// const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
  transporter,
  getPasswordResetURL,
  resetPasswordTemplate,
} = require("../models/emailModel");

// @route POST api /usermng/forgotPassword
// @desc forgot password
// @access Public
//POST Route to handle forgot password functionality
exports.forgotPassword = (req, res) => {
  console.log("In _forgotPassword");
  let where = "email = ?";
  const email = req.user.email;
  console.log(email);
  let sqlSelect = "SELECT * FROM users WHERE " + where;
  connection.db566.then(function (connection) {
    let query = connection.query(sqlSelect, email, (err, result) => {
      if (err) {
        console.log(err);
        res(err, null);
      } else if (result.length === 0) {
        console.log("Email Id is not registered with RideShare");
        res(null);
      } else {
        console.log(result[0]);
        sendPasswordResetEmail(result[0]);
        res(null, result);
      }
    });
  });
};

// // `secret` is passwordHash concatenated with user's createdAt,
// // so if someones gets a user token they still need a timestamp to intercept.
// usePasswordHashToMakeToken = ({password: password, _id: userId, createdAt}) => {
//     const secret = password + "-" + createdAt
//     const token = jwt.sign({ userId }, secret, {
//         expiresIn: 3600 // 1 hour
//     })
//     return token
// }

//Author - Jigar Makwana B00842568
// @desc helper function to send password reset email
// @access Public
sendPasswordResetEmail = (user) => {
  console.log("In sendPasswordResetEmail: " + user.userId);
  // const token = usePasswordHashToMakeToken(user)
  // const url = getPasswordResetURL(user.userId, token)
  const url = getPasswordResetURL(user.userId);
  const emailTemplate = resetPasswordTemplate(user, url);
  console.log(url);
  const sendEmail = () => {
    transporter.sendMail(emailTemplate, (err, info) => {
      if (err) {
        // res.status(500).json("Error sending email")
        console.log(`** Error sending an email **` + err);
      } else {
        console.log(`** Email sent **`);
      }
    });
  };
  sendEmail();
};

//Author - Jigar Makwana B00842568
// @route POST api /resetpassword/:userId
// @desc rest password
// @access Public
//PUT Route to handle password reset functionality
exports.receiveNewPassword = (req, result) => {
  const { userId } = req.params;
  const { password } = req.body;
  console.log("In reset password userId: " + userId);
  console.log("In reset password password: " + password);
  var sqlUpdate = "UPDATE users SET password=? WHERE userId= " + userId;
  let unHashesPassword = password;
  bcrypt.hash(unHashesPassword, 10, function (err, hash) {
    connection.db566.then(function (connection) {
      connection.query(sqlUpdate, hash, function (err, succ) {
        if (err) {
          console.log(err);
          console.log("update unsuccessful");
          result(err, null);
        } else {
          console.log("update success!");
          result(null, true);
        }
      });
    });
  });
};

// reference: https://ahrjarrett.com/posts/2019-02-08-resetting-user-passwords-with-node-and-jwt
