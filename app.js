// imports
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 3000;

//static files
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/img", express.static(__dirname + "public/img"));

// To let express use json code
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//set views
app.set("views", "./views");
app.set("view engine", "ejs");

//views
app.get("", (req, res) => {
  res.render("index");
});

app.post("/signup", (req, res) => {
  console.log(`Welcome ${req.body.username}`);
  res.send("succesful");
});

// listen on port
app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
