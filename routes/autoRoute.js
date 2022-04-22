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

function dbConvert(name) {
  var sem = (name.substr(0, 3)).toLowerCase();
  var year = name.substr(-2);
  var result = sem + year;
  console.log(result);
  return result;
}

function QueryOne(tableName, crID, crName, sTitle, clID, clCapacity, section, credit, sEnrolled, sCapacity, faculty, clStart, clEnd, clDays) {
  db.query("INSERT INTO " + tableName +
    "_course (COFFER_COURSE_ID, COURSE_NAME, SCHOOL_TITLE)" +
    " VALUES ('" + crID + "', '" + crName + "', '" + sTitle + "');",
    function(err, rows) {
      if (err) {
        throw err;
      } else {
        console.log("Query 1 executed.");
        return QueryTwo(tableName, crID, crName, sTitle, clID, clCapacity, section, credit, sEnrolled, sCapacity, faculty, clStart, clEnd, clDays);
      }
    })
}

function ImportFormData(tName, sTitle, crName, crID, credit, section, sCapacity, sEnrolled, clID, clCapacity, faculty, clStart, clEnd, clDays, callback) {
  var tableName = dbConvert(tName);
  var returnText;
  db.query("SHOW TABLES LIKE '" + tableName + "_class';", function(err, result) {
    if (err) {
      throw err;
    } else {
      if (result[0]) {
        QueryOne(tableName, crID, crName, sTitle, clID, clCapacity, section, credit, sEnrolled, sCapacity, faculty, clStart, clEnd, clDays);
        textToReturn = "Table has been updated. Have a nice day!";
        return callback(textToReturn);
      } else {
        var existText = "Table aready exists";
        return callback(existText);
      }
    }
  });
}

router.get("/", function(req, res, next) {
  console.log(req.query);
  let tName = req.query.tName;
  ImportFormData(tName, (param) => {
    res.send({
      message: param
    });
  });
});

module.exports = router;
