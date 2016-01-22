var express = require('express');
var path = require('path');
var app = express();

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/html/index.html'));
});

app.get('/:time', function (req, res) {
  var result = {};
  var time = new Date(req.params.time);
  if (time.valueOf()) {
    res.json({ 'unix': time.valueOf(), 'natural': time.toLocaleString('en-us', { month: "long" }) + ' ' + time.getDate() + ', ' + time.getFullYear() });
  } else {
    res.json({ 'unix': null, 'natural': null });
  }
});

app.listen(3000, function () {
  console.log('Listening on port 3000...');
});
