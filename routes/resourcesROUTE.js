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

// //Connect to mysql
// db.connect((err) => {
//   if (err) {
//     console.log("MySQL not connected")
//     throw err;
//   }
//   console.log('resoucesAPI connected to MySQL');
// });

function dbConvert(sem, year) {
  sem = (sem.substr(0, 3)).toLowerCase();
  year = year.substr(-2);
  var result = sem + year;
  return result;
}

//Function and query to get total credits
function getUnusedResources(sem, year, callback) {
  if (isNaN(year)) {
    return callback(0);
  } else {
    var semester = dbConvert(sem, year);
    //Checking if table exists
    db.query("SHOW TABLES LIKE '" + semester + "_class';", function(err, result) {
      if (err) {
        throw err;
      } else {
        if (!result[0]) {
          return callback(0);
        } else {
          db.query("SELECT (((AVG(ROOM_CAPACITY) - AVG(ENROLLED)) / AVG(ROOM_CAPACITY)) * 100) AS Unused_Resources, SCHOOL_TITLE AS School FROM " +
          semester + "_class, " + semester + "_room, " + semester + "_course WHERE (" + semester + "_course.COFFER_COURSE_ID = " + semester + "_class.COFFER_COURSE_ID) AND (" +
          semester + "_class.ROOM_ID = " + semester + "_room.ROOM_ID) GROUP BY SCHOOL_TITLE;",
            function(err, rows) {
              if (err) {
                throw err;
              } else {
                console.log(rows);
                var arr = [];
                for (var k = 0; k < rows.length; k++) {
                  arr.push([rows[k].Unused_Resources, rows[k].School]);
                }
                console.log("Array is:")
                console.log(arr);
                return callback(arr);
              }
            })
        }
      }
    })
  }
}

router.get("/", function(req, res, next) {
  //console.log(req.query);
  let sem = req.query.sem;
  let year = req.query.year;
  getUnusedResources(sem, year, (param) => {
    res.send({
      resources: param
    });
  });
});

module.exports = router;