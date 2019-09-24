var express = require("express");
const fs = require("fs");
var cors = require("cors");
const path = require("path");
const app = express();
app.use(cors());
app.use(express.json());
let folderPath = {
  path: "/"
};
let sendData = [];
app.get("/api/getDirectory", function(req, res) {
  sendData = fs.readdirSync(folderPath.path).map(e => {
    return {
      name: e,
      select: false
    };
  });
  res.send(sendData);
  console.log(folderPath.path);
  console.log(fs.readdirSync(folderPath.path));
});

app.post("/api/changeDirectory", function(req, res) {
  console.log(req.body);
  folderPath = req.body;
  res.send({});
});

app.listen(5000, function() {
  console.log("Started on PORT 5000");
});
