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

// //Heroku Connection Backup
// const db = mysql.createConnection({
//   host: 'eu-cdbr-west-02.cleardb.net',
//   user: 'b54630b7ab1862',
//   password: 'ad9fbff2',
//   database: 'heroku_fc7ad7de78d29f7'
// })

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
//   console.log('classAPI connected to MySQL');
// });

function dbConvert(sem, year) {
  sem = (sem.substr(0, 3)).toLowerCase();
  year = year.substr(-2);
  var result = sem + year;
  return result;
}

function combineResult(val1, val2) {
  let resultVal = [0, 0, 0, 0];
  if (val1 & val2) {
    if (val2 != undefined) {
      resultVal[0] = val1;
      resultVal[1] = resultVal[0] / 14; //For 7 Slots
      resultVal[2] = resultVal[0] / 16; //For 8 Slots
      resultVal[3] = val2;
      //Zero-th index contains total number of Sections
      //First index contains total classrooms required for 7 Slots
      //Second index contains total classrooms required for 8 Slots
      //Third index contains total number of classrooms available
      console.log("Result Val: " + resultVal);
      return resultVal;
    } else {
      console.log("callback returned 0 at combineResult Function");
      return callback(0);
    }
  }
}

//Function and query to get total credits
function getClass(sem, year, size1, size2, callback) {
  if (isNaN(year)) {
    return callback(0);
  } else {
    var semester = dbConvert(sem, year);
    //Checking if table exists
    db.query("SHOW TABLES LIKE '" + semester + "_class';", function(err, result) {
      var resultVal1, resultVal2;
      var resVal = [0,0,0,0];
      //console.log(err);
      //console.log(result);
      if (err) {
        throw err;
      } else {
        if (!result[0]) {
          return callback(0);
        } else {
          if (size1 != 0) {
            db.query("SELECT COUNT(ENROLLED) AS SECTIONS FROM " + semester +
              "_class WHERE ENROLLED BETWEEN " + size1 + " AND " + size2 + ";",
              function(err, rows) {
                //console.log(rows);
                if (err) {
                  throw err;
                } else {
                  resultVal1 = rows[0].SECTIONS;
                  console.log("Sem: " + sem + " Year: " + year + " size1: " + size1 + " size2: " + size2);
                  console.log("Enrolled: " + resultVal1);
                  resVal[0] = resultVal1; //Sections
                  resVal[1] = Math.ceil(resVal[0] / 14); //For 7 Slots
                  resVal[2] = Math.ceil(resVal[0] / 16); //For 8 Slots
                }
              })
            setTimeout(function () {
              db.query("SELECT COUNT(ROOM_CAPACITY) AS ROOMS FROM " + semester +
                "_room WHERE ROOM_CAPACITY BETWEEN " + size1 + " AND " + size2 + ";",
                function(err, rows) {
                  //console.log(rows);
                  if (err) {
                    throw err;
                  } else {
                    resultVal2 = rows[0].ROOMS;
                    console.log("Rooms: " + resultVal2);
                    resVal[3] = resultVal2; //Rooms
                    console.log(resVal);
                    return callback(resVal);
                  }
                })
              }, 100);
          } else {
            return callback(0);
          }
        }
      }
    })
  }
}

router.get("/", function(req, res, next) {
  let sem = req.query.sem;
  let year = req.query.year;
  let size1 = req.query.size1;
  let size2 = req.query.size2;
  getClass(sem, year, size1, size2, (param) => {
    res.send({
      classes: param
    });
  });
});

module.exports = router;
