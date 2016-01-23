/* jshint node: true */
'use strict';

var express = require('express');
var path = require('path');
var app = express();

function getJSONTimeResult (time) {
  // if time is int, assume unixtime and multiply with 1000 to convert from ms to s
  // otherwise let the Date object see if it can parse the string as a date
  time = new Date(time == parseInt(time, 10) ? time*1000 : time);
  var unixTime = time.valueOf();
  var naturalTime = time.toLocaleString('en-us', { month: "long" }) + ' ' + time.getDate() + ', ' + time.getFullYear();
  var result = {
    'unix': null,
    'natural': null
  };

  if (unixTime) {
    result.unix = unixTime / 1000;
    result.natural = naturalTime;
  }
  return result;
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/html/index.html'));
});

app.get('/:time', function (req, res) {
  res.json(getJSONTimeResult(req.params.time));
});

module.exports = app;
