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
function getTotalCredits(school, sem, year, callback) {
  if (isNaN(year)) {
    return callback(0);
  } else {
    var semester = dbConvert(sem, year);
    var schoolName = school;
    console.log(semester);
    //Checking if table exists
    db.query("SHOW TABLES LIKE '" + semester + "_course';", function(err, result) {
      if (err) {
        throw err;
      } else {
        if (!result[0]) {
          return callback(0);
        } else {
          db.query("SELECT sum(" + semester + "_class.CREDIT_HOUR * " + semester + "_class.ENROLLED) as C_HOUR from " +
            semester + "_class, " + semester + "_course WHERE (" + semester +
            "_class.COFFER_COURSE_ID = " + semester + "_course.COFFER_COURSE_ID) AND " + semester + "_course.SCHOOL_TITLE = '" + schoolName + "';",
            function(err, rows) {
              if (err) {
                throw err;
              } else {
                var result = rows[0].C_HOUR;
                //console.log(result);
                return callback(result);
              }
            })
        }
      }
    })
  }
}

router.get("/", function(req, res, next) {
  console.log(req.query);
  let school = req.query.school;
  let sem = req.query.sem;
  let year = req.query.year;
  //console.log(sem);
  //console.log(year);
  getTotalCredits(school, sem, year, (param) => {
    res.send({
      credit: param
    });
  });
});

module.exports = router;