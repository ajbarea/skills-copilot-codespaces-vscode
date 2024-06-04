//Create a webserver
var http = require("http");
var fs = require("fs");
var path = require("path");
var url = require("url");
var comments = [];
var mime = require("mime");
var server = http.createServer(function (req, res) {
  var urlObj = url.parse(req.url, true);
  var pathname = urlObj.pathname;
  if (pathname == "/") {
    res.setHeader("Content-Type", "text/html;charset=utf-8");
    fs.createReadStream("./comment.html").pipe(res);
  } else if (pathname == "/comment") {
    var comment = urlObj.query;
    comments.push(comment);
    res.statusCode = 302;
    res.setHeader("Location", "/");
    res.end();
  } else if (pathname == "/getComments") {
    res.end(JSON.stringify(comments));
  } else {
    fs.access("." + pathname, function (err) {
      if (!err) {
        res.setHeader("Content-Type", mime.lookup(pathname) + ";charset=utf-8");
        fs.createReadStream("." + pathname).pipe(res);
      } else {
        res.statusCode = 404;
        res.end("Not Found");
      }
    });
  }
});
server.listen(8080);
