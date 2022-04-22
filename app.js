//jshint esversion: 6

var revenueROUTERouter = require("./routes/revenueROUTE");
var detailsROUTERouter = require("./routes/detailsROUTE");
var resourcesROUTERouter = require("./routes/resourcesROUTE");
var sectionROUTERouter = require("./routes/sectionROUTE");
var classROUTERouter = require("./routes/classROUTE");
var sampleROUTERouter = require("./routes/sampleROUTE");
var uploadROUTERouter = require("./routes/uploadROUTE");

const express = require("express");
const bodyparser = require("body-parser");
const cors = require('cors');
const mysql = require('mysql');

const multer = require('multer');
const csv = require('fast-csv');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static("public"));
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
  extended: true
}));

//File Upload System Setup
//-----------------------------------------------------------------------------

//Database connection
const db = mysql.createPool({
  host: 'eu-cdbr-west-02.cleardb.net',
  user: 'b54630b7ab1862',
  password: 'ad9fbff2',
  database: 'heroku_fc7ad7de78d29f7'
})

//Use of Multer
var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, './uploads/')
  },
  filename: (req, file, callBack) => {
    callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

var upload = multer({
  storage: storage
});

//Routes start
//routes for upload page
app.get('/uploadfile', (req, res) => {
  res.sendFile(__dirname + '/public/upload.html');
})

//@type POST
// upload csv to database
app.post('/uploadfile', upload.single("uploadfile"), (req, res) => {
  UploadCsvDataToMySQL(__dirname + '/uploads/' + req.file.filename, req.body);
  console.log('CSV file data has been uploaded in mysql database');
});

function dbConvert(name) {
  var sem = (name.substr(0, 3)).toLowerCase();
  var year = name.substr(-2);
  var result = sem + year;
  console.log(result);
  return result;
}

//Queries ------------------------------------------

function InsertQuery(query, csvData) {
  db.query(query, [csvData], (error, response) => {
    console.log("Insert Query");
    console.log(error || response);
  });
}

function MigrateQueryCourse(query) {
  db.query(query, (error, response) => {
    console.log("Migrate Query Course");
    console.log(error || response);
  });
}

function MigrateQueryRoom(query) {
  db.query(query, (error, response) => {
    console.log("Migrate Query Room");
    console.log(error || response);
  });
}

function MigrateQueryClass(query) {
  db.query(query, (error, response) => {
    console.log("Migrate Query Class");
    console.log(error || response);
  });
}

function TruncateTable(query) {
  db.query(query, (error, response) => {
    console.log("Truncate Query For Tally Sheet");
    console.log(error || response);
    console.log('All the Queries has been executed successfully');
  });
}

//-----------------------------------------------

function UploadCsvDataToMySQL(filePath, names) {
  let stream = fs.createReadStream(filePath);
  let csvData = [];
  let csvStream = csv
    .parse()
    .on("data", function(data) {
      csvData.push(data);
    })
    .on("end", function() {
      // Remove Header ROW
      csvData.shift();

      // Open the MySQL connection
      db.getConnection((error) => {
        if (error) {
          console.error(error);
        } else {
          console.log(names.name);
          console.log('Query Execution Started.');
          var tName = dbConvert(names.name);
          let query1 = 'INSERT INTO tallysheet (SCHOOL_TITLE, COFFER_COURSE_ID, COFFERED_WITH, SECTION, CREDIT_HOUR, CAPACITY, ENROLLED, ROOM_ID, ROOM_CAPACITY, BLOCKED, COURSE_NAME, FACULTY_FULL_NAME, STRAT_TIME, END_TIME, ST_MW) VALUES ?';
          InsertQuery(query1, csvData);
          let query2 = 'CREATE TABLE ' + tName + '_course AS SELECT DISTINCT COFFER_COURSE_ID, COURSE_NAME, SCHOOL_TITLE FROM tallysheet ORDER BY SCHOOL_TITLE;';
          setTimeout(function () {
            MigrateQueryCourse(query2);
          }, 1500);
          let query3 = 'CREATE TABLE ' + tName + '_room AS SELECT DISTINCT ROOM_ID, ROOM_CAPACITY FROM tallysheet ORDER BY ROOM_ID;';
          setTimeout(function () {
            MigrateQueryRoom(query3);
          }, 1600);
          let query4 = 'CREATE TABLE ' + tName + '_class AS SELECT COFFER_COURSE_ID, SECTION, CREDIT_HOUR, ENROLLED, CAPACITY, ROOM_ID, FACULTY_FULL_NAME, STRAT_TIME AS START_TIME, END_TIME, ST_MW FROM tallysheet ORDER BY COFFER_COURSE_ID, SECTION;';
          setTimeout(function () {
            MigrateQueryClass(query4);
          }, 1700);
          let query5 = 'DELETE FROM tallysheet';
          setTimeout(function () {
            TruncateTable(query5);
          }, 4000);
        }
      });
      // delete temporary file after saving to MySQL database
      fs.unlinkSync(filePath);
    });
  stream.pipe(csvStream);
}
//-----------------------------------------------------------------------------

app.listen(process.env.PORT || 3000, function() {
  console.log(`The Server is up and running on port: ${process.env.PORT || '3000'}`);
})

app.use("/revenueROUTE", revenueROUTERouter);
app.use("/detailsROUTE", detailsROUTERouter);
app.use("/resourcesROUTE", resourcesROUTERouter);
app.use("/sectionROUTE", sectionROUTERouter);
app.use("/classROUTE", classROUTERouter);
app.use("/sampleROUTE", sampleROUTERouter);
app.use("/uploadROUTE", uploadROUTERouter);
