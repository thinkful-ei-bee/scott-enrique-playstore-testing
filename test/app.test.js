const app = require('../app');
const expect = require('chai').expect;
const request = require('supertest');
const store = require('../playstore');


describe('Playstore App', () => {
  it('GET /app should return playstore', () => {
    return request(app)
      .get('/app')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf(store.length);
      });
  })
});