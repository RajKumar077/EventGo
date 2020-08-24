//@Author - RajKumar B00849566

var connection = require("./DatabaseConn");
const { NULL } = require("mysql2/lib/constants/types");

var Obj = function () {};

//GET all the events created by given userId
Obj.getUserEventsHistory = (userId, result) => {
  //connection is a promise, use 'then' to execute after promise returns
  connection.db566.then(function (connection) {
    let sql566 = "select * from createdevents where userid=" + userId;
    let query566 = connection.query(sql566, (error566, result566) => {
      if (error566) {
        console.log(error566);
      } else {
        //console.log(result566[0]);
        result(null, result566);
      }
    });
  });
};


Obj.gettest = (userId, result) => {
  connection.db566.then(function (connection) {
    result(null, "test");
  })
};



//POST the event. insert created event to database
Obj.postUserEvent = (userId, event, result) => {
  var sql =
    "INSERT INTO createdevents (userid,eventTypeVal, fromAddress, toAddress, doj, seats, estPrice, description,imageurl1,imageurl2,createddate) VALUES ?";
  var values = [
    [
      userId,
      event["newItem"].eventTypeVal,
      event["newItem"].fromAddress,
      event["newItem"].toAddress,
      event["newItem"].dateToDisplay,
      event["newItem"].seats,
      event["newItem"].estPrice,
      event["newItem"].description,
      event["newItem"].imageurls.length > 0 &&
      event["newItem"].imageurls[0] != undefined
        ? event["newItem"].imageurls[0]
        : null,
      event["newItem"].imageurls.length > 1 &&
      event["newItem"].imageurls[1] != undefined
        ? event["newItem"].imageurls[1]
        : null,
      new Date(),
    ],
  ];
  connection.db566.then(function (connection) {
    connection.query(sql, [values], function (err, succ) {
      if (err) console.log(err);
      else {
        //if Insertion is successfull, GET all the events back to the client.
        let sql566 = "select * from createdevents where userid=" + userId;
        let query566 = connection.query(sql566, (error566, result566) => {
          if (error566) {
            console.log(error566);
            result(error566, null);
          } else {
            result(null, result566);
          }
        });
      }
    });
  });
};

//Update particular event
Obj.updateUserEvent = (userId, event, result) => {
  let url1 =
    event["updatedItem"].imageurls.length > 0 &&
    event["updatedItem"].imageurls[0] != undefined
      ? "'" + event["updatedItem"].imageurls[0] + "'"
      : null;
  let url2 =
    event["updatedItem"].imageurls.length > 1 &&
    event["updatedItem"].imageurls[1] != undefined
      ? "'" + event["updatedItem"].imageurls[1] + "'"
      : null;
  var sql =
    `UPDATE createdevents SET 
    eventTypeVal="` +
    event["updatedItem"].eventTypeVal +
    `", fromAddress="` +
    event["updatedItem"].fromAddress +
    `", toAddress="` +
    event["updatedItem"].toAddress +
    `", doj="` +
    event["updatedItem"].dateToDisplay +
    `", seats=` +
    event["updatedItem"].seats +
    `, estPrice=` +
    event["updatedItem"].estPrice +
    `, description="` +
    event["updatedItem"].description +
    `", imageurl1=` +
    url1 +
    `, imageurl2=` +
    url2 +
    ` WHERE eventid=` +
    event["updatedItem"].eventid;
  //console.log(sql);
  connection.db566.then(function (connection) {
    connection.query(sql, function (err, succ) {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, true);
      }
    });
  });
};

//DELETE particular event
Obj.deleteUserEvent = (userId, eventId, result) => {
  var sql =
    `DELETE FROM createdevents WHERE eventid=` +
    eventId +
    ` and userid=` +
    userId;

  connection.db566.then(function (connection) {
    connection.query(sql, function (err, succ) {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, true);
      }
    });
  });
};

module.exports = Obj;
