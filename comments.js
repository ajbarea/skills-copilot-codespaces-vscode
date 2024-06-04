//Create a web server
var express = require("express");
var app = express();
var path = require("path");
var fs = require("fs");
var bodyParser = require("body-parser");
var comments = require("./comments.json");

//Set the views directory
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

//Set up the static files directory
app.use(express.static(path.join(__dirname, "public")));

//Set up the body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Set up the main page
app.get("/", function (req, res) {
  res.render("index", { title: "Comments", comments: comments.comments });
});

//Set up the post method
app.post("/new", function (req, res) {
  //Get the comment from the request
  var comment = req.body.comment;
  //Add the comment to the comments array
  comments.comments.push(comment);
  //Write the updated comments array to the comments.json file
  fs.writeFile("./comments.json", JSON.stringify(comments), function (err) {
    if (err) {
      console.log(err);
    }
  });
  //Redirect the user back to the main page
  res.redirect("/");
});

//Start the server
app.listen(3000, function () {
  console.log("Server running on http://localhost:3000");
});
