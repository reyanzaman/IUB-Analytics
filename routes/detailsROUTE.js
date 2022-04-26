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
//   console.log('detailsAPI connected to MySQL');
// });

function dbConvert(sem, year) {
  sem = (sem.substr(0, 3)).toLowerCase();
  year = year.substr(-2);
  var result = sem + year;
  return result;
}

//Function and query to get total credits
function getTotalSections(sem, year, size, callback) {
  if (isNaN(year)) {
    return callback(0);
  } else {
    var semester = dbConvert(sem, year);
    var secSize = size;
    //Checking if table exists
    db.query("SHOW TABLES LIKE '" + semester + "_course';", function(err, result) {
      if (err) {
        throw err;
      } else {
        if (!result[0]) {
          return callback(0);
        } else {
          db.query("SELECT COUNT(ENROLLED) AS T_Sections, SCHOOL_TITLE AS T_Title FROM " +
            semester + "_class AS CL, " + semester +
            "_course AS CR WHERE (CL.COFFER_COURSE_ID = CR.COFFER_COURSE_ID) AND ENROLLED = " +
            secSize + " GROUP BY SCHOOL_TITLE",
            function(err, rows) {
              if (err) {
                throw err;
              } else {
                var arr = [];
                for (var k = 0; k < rows.length; k++) {
                  arr.push([rows[k].T_Sections, rows[k].T_Title]);
                }
                //console.log(arr);
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
  let size = req.query.size;
  getTotalSections(sem, year, size, (param) => {
    res.send({
      sections: param
    });
  });
});

module.exports = router;