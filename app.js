//jshint esversion: 6

var revenueROUTERouter = require("./routes/revenueROUTE");
var detailsROUTERouter = require("./routes/detailsROUTE");
var resourcesROUTERouter = require("./routes/resourcesROUTE");
var sectionROUTERouter = require("./routes/sectionROUTE");
var classROUTERouter = require("./routes/classROUTE");
var sampleROUTERouter = require("./routes/sampleROUTE");
var uploadROUTERouter = require("./routes/uploadROUTE");
var autoROUTERouter = require("./routes/autoROUTE");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

// app.get("/", function(req, res) {
//   res.sendFile(__dirname + "/index.html");
// })

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
app.use("/autoROUTE", autoROUTERouter);
