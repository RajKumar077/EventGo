var connection = require('./DatabaseConn');



var Obj = function () {

}

Obj.getEventsAndRequests = (userId, result) => {
    connection.db566.then(function (connection) {
        let events_sql = 'select * from createdevents where userid=' + userId + '; ';
        let req_sql = ` select requesteventId,r.eventid,r.userid,r.seats,r.description,r.status` +
            ` from requestevent r` +
            ` join createdevents c on c.eventid = r.eventid` +
            ` where c.userid = ` + userId;


        let query = connection.query(events_sql, (error, eventResult) => {
            if (error) {
                console.log(error);
            } else {

                connection.query(req_sql, (error2, reqResult) => {
                    if (error2) {
                        console.log(error2);
                    } else {
                        let postresult = {
                            events: eventResult,
                            requests: reqResult
                        };
                        result(null, postresult);
                    }
                })


            }
        })
    });

    //var res = eventsHist.filter(item => item['userId'] == userId);
    //result(null, res);
}

// Author Breej - B00843525
// used to insert request data and keep track of who requested which events
Obj.postRequestedEvent = (userId, event, result) => {
    // check weather the event has already been requested by user ?
    var squery = `Select * from requestevent where userid = ${event.userid} and eventid = ${event.eventid}`;
    connection.db566.then(function (connection) {
        let equery = connection.query(squery, (err, searchresult) => {
            console.log(searchresult, searchresult.length)
            if (err) {
                console.log(err);
            } else if (searchresult.length == 0) {
                var query = `INSERT INTO requestevent (eventid,userid,seats,description,status) VALUES (?) `;
                var values = [
                    event.eventid,
                    event.userid,
                    event.seats,
                    event.description,
                    -1
                ];

                connection.query(query, [values], (err, insertresult) => {
                    if (err) {
                        console.log(err);
                    } else {
                        result(null, 'success')
                    }
                });
            } else {
                result("exist", null)
            }

        });
    });

};

module.exports = Obj;