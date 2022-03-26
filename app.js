//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

//Create database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'iub_analytics'
})

//Connect to mysql
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL Connected');
});

const app = express();

//Create database
app.get('/createdb', (req, res) => {
  let sql = 'CREATE DATABASE iub_analytics'
  db.query(sql, (err) => {
    if (err) {
      throw err;
    }
    res.send('Database Created');
  })
})

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
})

app.post("/revenue", function(req, res) {
  // res.send(`Year is: ${req.body.year}.`);
})

app.post("/sectiondetails", function(req, res) {

})

app.post("/sectionanalysis", function(req, res) {

})

app.post("/unusedresource", function(req, res) {

})

app.post("/classroomrequirement", function(req, res) {

})

app.listen(process.env.PORT || 3000, function() {
  console.log("The Server is up and running on port 3000")
})
