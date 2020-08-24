//@Author - RajKumar B00849566

const mysql566 = require('mysql2');
var Client = require('ssh2').Client;
var ssh566 = new Client();

// var db566 = new Promise(function (resolve, reject) {

//     // ssh566.on('ready', function () {

//     //     ssh566.forwardOut(
//     //         // source address, this can usually be any valid address
//     //         '127.0.0.1',
//     //         // source port, this can be any valid port number
//     //         3306,
//     //         // destination address (localhost here refers to the SSH server)
//     //         'db.cs.dal.ca',
//     //         // destination port
//     //         3306,
//     //         function (err, stream) {

//     //             if (err) throw err; // SSH error: can also send error in promise ex. reject(err)
//     //             // use `sql` connection as usual

//     //         });
//     // }).connect({
//     //     host: 'bluenose.cs.dal.ca',
//     //     port: 22,
//     //     user: 'gangi',
//     //     password: 'B00849566'
//     // });

// }).catch((err) => {
//     if (err) throw "lolll";
// });

var db566 = new Promise((resolve, reject) => {

    var db = mysql566.createConnection({
        host: 'rideshare.clk7cf9g9ru4.us-east-1.rds.amazonaws.com',
        user: "admin",
        password: 'Test1234', //TODO: Password in env or separate file
        port: 3306,
        database: 'rideshareDB'
    });

    // send connection back in variable depending on success or not
    db.connect(function (err) {
        if (err) {
            console.log("error aai bhai!")
            //resolve(connection);
            reject(err);
        } else {
            resolve(db)
        }
    });



}).catch((err) => {
    if (err) throw "promise error";
})


exports.db566 = db566;