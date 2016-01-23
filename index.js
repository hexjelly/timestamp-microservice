var express = require('express');
var path = require('path');
var app = express();

function getJSONTimeResult (time) {
  var time = new Date(time);
  var unixTime = time.valueOf();
  var naturalTime = time.toLocaleString('en-us', { month: "long" }) + ' ' + time.getDate() + ', ' + time.getFullYear();
  var result = {
    'unix': null,
    'natural': null
  };

  if (unixTime) {
    result.unix = unixTime;
    result.natural = naturalTime;
  }
  return result;
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/html/index.html'));
});

app.get('/:time', function (req, res) {
  res.json(getJSONTimeResult(req.params.time));
});

app.listen(3000, function () {
  console.log('Listening on port 3000...');
});
