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
//   console.log('sectionAPI connected to MySQL');
// });

function dbConvert(sem, year) {
  sem = (sem.substr(0, 3)).toLowerCase();
  year = year.substr(-2);
  var result = sem + year;
  return result;
}

//Function and query to get total credits
function getSectionsSETS(sem, year, size1, size2, callback) {
  if (isNaN(year)) {
    return callback(0);
  } else {
    var semester = dbConvert(sem, year);
    //Checking if table exists
    
          } else {
            return callback(0);
          }
        }
      }
    })
  }
}

router.get("/", function(req, res, next) {
  //console.log(req.query);
  let sem = req.query.sem;
  let year = req.query.year;
  let size1 = req.query.size1;
  let size2 = req.query.size2;
  getSectionsSETS(sem, year, size1, size2, (param) => {
    res.send({
      section: param
    });
  });
});

module.exports = router;
