var request = require('supertest');
var server;

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
