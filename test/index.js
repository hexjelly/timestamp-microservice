var request = require('supertest');
var rewire = require('rewire');
var assert = require('assert');
var server;

// route responses
describe('Routes', function () {
  before(function () {
    server = require('../server').listen(3000);
  });

  after(function () {
    server.close();
  });

  it('/ responds with html', function (done) {
    request(server)
      .get('/')
      .set('Accept', 'text/html')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });

  it('/* responds with json', function (done) {
    request(server)
      .get('/123456')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

// function tests
describe('getJSONTimeResult', function () {
  before(function () {
    var server = rewire('../server');
    getJSONTimeResult = server.__get__('getJSONTimeResult');
  });

  it('Null result if mangled date', function () {
    var badDate = JSON.stringify(getJSONTimeResult('Not a date!'));
    var expected = JSON.stringify({ 'unix': null, 'natural': null });
    assert.equal(badDate, expected);
  });

  it('Correct result for \'21 Jan 2001\'', function () {
    var goodDate = JSON.stringify(getJSONTimeResult('21 Jan 2001'));
    var expected = JSON.stringify({ 'unix': 980031600, 'natural': 'January 21, 2001' });
    assert.equal(goodDate, expected);
  });

  it('Correct result for \'Jan 1995\'', function () {
    var goodDate = JSON.stringify(getJSONTimeResult('Jan 1995'));
    var expected = JSON.stringify({"unix":788914800,"natural":"January 1, 1995"});
    assert.equal(goodDate, expected);
  });

  it('Correct result for \'1950 february 29\'', function () {
    var goodDate = JSON.stringify(getJSONTimeResult('1950 february 29'));
    var expected = JSON.stringify({"unix":-626058000,"natural":"March 1, 1950"});
    assert.equal(goodDate, expected);
  });
});
