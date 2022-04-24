var express = require("express");
var router = express.Router();
var mysql = require("mysql");

//Heroku Connection
var db = mysql.createPool({
  connectionLimit: 10,
  host: 'eu-cdbr-west-02.cleardb.net',
  user: 'b54630b7ab1862',
  password: 'ad9fbff2',
  database: 'heroku_fc7ad7de78d29f7'
})

//Local Connection
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'iub_database'
// })
//
// //Connect to mysql
// db.connect((err) => {
//   if (err) {
//     console.log("MySQL not connected")
//     throw err;
//   }
//   console.log('restAPI connected to MySQL');
// });

function dbConvert(sem, year) {
  sem = (sem.substr(0, 3)).toLowerCase();
  year = year.substr(-2);
  var result = sem + year;
  return result;
}

//Function and query to get total credits
function getSample(callback) {
  semester = 'spr21';
  //Checking if table exists
  db.query("SHOW TABLES LIKE '" + semester + "_course';", function(err, result) {
    if (err) {
      throw err;
    } else {
      if (!result[0]) {
        return callback(0);
      } else {

      }
    }
  })
}

router.get("/", function(req, res, next) {
  //console.log(req.query);
  let test = req.query.test;
  //console.log(sem);
  //console.log(year);
  getSample((param) => {
    res.send({
      samples: param
    });
  });
});

module.exports = router;
