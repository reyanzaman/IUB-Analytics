//jshint esversion: 6

var restAPIRouter = require("./routes/restAPI");
var detailsAPIRouter = require("./routes/detailsAPI");
var resourcesAPIRouter = require("./routes/resourcesAPI");
var sectionAPIRouter = require("./routes/sectionAPI");
var classAPIRouter = require("./routes/classAPI");
var sampleAPIRouter = require("./routes/sampleAPI");

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

app.use("/restAPI", restAPIRouter);
app.use("/detailsAPI", detailsAPIRouter);
app.use("/resourcesAPI", resourcesAPIRouter);
app.use("/sectionAPI", sectionAPIRouter);
app.use("/classAPI", classAPIRouter);
app.use("/sampleAPI", sampleAPIRouter);
