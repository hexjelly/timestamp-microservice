var request = require('supertest');

describe('Routes', function () {
    var server;
    beforeEach(function () {
      delete require.cache[require.resolve('../server')];
      server = require('../server').listen(3000);
    });
    afterEach(function (done) {
      server.close(done);
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
