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

function QueryTwo(tableName, crID, crName, sTitle, clID, clCapacity, section, credit, sEnrolled, sCapacity, faculty, clStart, clEnd, clDays) {
  db.query("INSERT INTO " + tableName +
    "_room (ROOM_ID, ROOM_CAPACITY)" +
    " VALUES ('" + clID + "', '" + clCapacity + "');",
    function(err, rows) {
      if (err) {
        throw err;
      } else {
        console.log("Query 2 executed.");
        return QueryThree(tableName, crID, section, credit, sEnrolled, sCapacity, clID, faculty, clStart, clEnd, clDays);
      }
    })
}

function QueryThree(tableName, crID, section, credit, sEnrolled, sCapacity, clID, faculty, clStart, clEnd, clDays) {
  db.query("INSERT INTO " + tableName +
    "_class (COFFER_COURSE_ID, SECTION, CREDIT_HOUR, ENROLLED, CAPACITY, ROOM_ID, FACULTY_FULL_NAME, START_TIME, END_TIME, ST_MW)" +
    " VALUES ('" + crID + "', '" + section + "', '" + credit + "', '" + sEnrolled + "', '" + sCapacity + "', '" + clID + "', '" +
    faculty + "', '" + clStart + "', '" + clEnd + "', '" + clDays + "');",
    function(err, rows) {
      if (err) {
        throw err;
      } else {
        returnText = "Table has been updated. Have a nice day!";
        console.log("Query 3 executed.");
        return returnText;
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
  let sTitle = req.query.sTitle;
  let crName = req.query.crName;
  let crID = req.query.crID;
  let credit = req.query.credit;
  let section = req.query.section;
  let sCapacity = req.query.sCapacity;
  let sEnrolled = req.query.sEnrolled;
  let clID = req.query.clID;
  let clCapacity = req.query.clCapacity;
  let faculty = req.query.faculty;
  let clStart = req.query.clStart;
  let clEnd = req.query.clEnd;
  let clDays = req.query.clDays;
  ImportFormData(tName, sTitle, crName, crID, credit, section, sCapacity, sEnrolled, clID, clCapacity, faculty, clStart, clEnd, clDays, (param) => {
    res.send({
      message: param
    });
  });
});

module.exports = router;