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
    console.log('Most of the Queries has been executed successfully');
  });
}

function ExtraTable(query){
  db.query(query, (error, response) => {
    console.log("Extra Table Query");
    console.log(error || response);
  })
}

function AlterTable(query){
  db.query(query, (error, response) => {
    console.log("Alter Table Query");
    console.log(error || response);
  })
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
      //csvData.shift();

      // Open the MySQL connection
      db.getConnection((error) => {
        if (error) {
          console.error(error);
        } else {
          console.log(names.name);
          console.log('Query Execution Started.');
          var tName = dbConvert(names.name);
          //Order 1 Insert Table Into Database
          let query1 = 'INSERT INTO tallysheet (SCHOOL_TITLE, COFFER_COURSE_ID, COFFERED_WITH, SECTION, CREDIT_HOUR, CAPACITY, ENROLLED, ROOM_ID, ROOM_CAPACITY, BLOCKED, COURSE_NAME, FACULTY_FULL_NAME, STRAT_TIME, END_TIME, ST_MW) VALUES ?';
          InsertQuery(query1, csvData);
          //Order 2 Create Table Sem_Class
          let query2 = 'CREATE TABLE ' + tName + '_class ENGINE=InnoDB AS SELECT COFFER_COURSE_ID, SECTION, CREDIT_HOUR, ENROLLED, CAPACITY, ROOM_ID, FACULTY_FULL_NAME, STRAT_TIME AS START_TIME, END_TIME, ST_MW FROM tallysheet ORDER BY COFFER_COURSE_ID, SECTION;';
          setTimeout(function () {
            MigrateQueryClass(query2);
          }, 1600);
          //Order 3 Create Table Sem_course
          let query3 = 'CREATE TABLE ' + tName + '_course ENGINE=InnoDB AS SELECT DISTINCT COFFER_COURSE_ID, COURSE_NAME, SCHOOL_TITLE FROM tallysheet ORDER BY SCHOOL_TITLE;';
          setTimeout(function () {
            MigrateQueryCourse(query3);
          }, 2000);
          //Order 4 Create Table Sem_room
          let query4 = 'CREATE TABLE ' + tName + '_room ENGINE=InnoDB AS SELECT DISTINCT ROOM_ID, ROOM_CAPACITY FROM tallysheet ORDER BY ROOM_ID;';
          setTimeout(function () {
            MigrateQueryRoom(query4);
          }, 2400);
          //Order 5 Create Table Sem_extra
          let query5 = 'CREATE TABLE ' + tName + '_extra ENGINE=InnoDB AS SELECT COFFER_COURSE_ID, SECTION, COFFERED_WITH, BLOCKED FROM tallysheet ORDER BY COFFER_COURSE_ID, SECTION';
          setTimeout(function () {
            ExtraTable(query5);
          }, 2800);
          //Order 6
          let query6 = 'DELETE FROM tallysheet';
          setTimeout(function () {
            TruncateTable(query6);
          }, 5000);

          //Alter Table to add Primary Keys
          //Primary Key and Foreign keys code has been commented out to prevent dummy data from causing errors.
          //Dummy data containts random values which does not follow the primary and foreign key constraint.
          //So, for simplicity's sake, the code has been commented out.

        //   //Order 7
        //   let query7 = 'ALTER TABLE ' + tName + '_class ADD CONSTRAINT ' + tName + '_class_PK PRIMARY KEY (COFFER_COURSE_ID, SECTION), ADD CONSTRAINT ' + tName + '_class_FK1 FOREIGN KEY(COFFER_COURSE_ID) REFERENCES ' + tName + '_course(COFFER_COURSE_ID), ADD CONSTRAINT ' + tName + '_class_FK2 FOREIGN KEY(ROOM_ID) REFERENCES ' + tName + '_room(ROOM_ID);';
        //   setTimeout(function () {
        //     AlterTable(query7);
        //   }, 5200);
        //   //Order 8
        //   let query8 = 'ALTER TABLE ' + tName + '_course ADD CONSTRAINT ' + tName + '_course_PK PRIMARY KEY (COFFER_COURSE_ID);';
        //   setTimeout(function () {
        //     AlterTable(query8);
        //   }, 5500);
        //   //Order 9
        //   let query9 = 'ALTER TABLE ' + tName + '_room ADD CONSTRAINT ' + tName + '_room_PK PRIMARY KEY (ROOM_ID);';
        //   setTimeout(function () {
        //     AlterTable(query9);
        //   }, 5600);
        //   //Order 10
        //   let query10 = 'ALTER TABLE ' + tName + '_extra ADD CONSTRAINT ' + tName + '_extra_PK PRIMARY KEY (COFFER_COURSE_ID, SECTION), ADD CONSTRAINT ' + tName + '_extra_FK1 FOREIGN KEY(COFFER_COURSE_ID) REFERENCES ' + tName + '_class(COFFER_COURSE_ID), ADD CONSTRAINT ' + tName + '_extra_FK2 FOREIGN KEY(SECTION) REFERENCES ' + tName + '_class(SECTION);';
        //   setTimeout(function () {
        //     AlterTable(query10);
        //   }, 5700);
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
