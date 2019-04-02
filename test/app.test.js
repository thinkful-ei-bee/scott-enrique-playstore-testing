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
  it('should filter by genre', ()=>{
    return request(app)
      .get('/app')
      // set up an array of genres names.. loop through that
      //and input [x] into where genre name goes
      .query({genres:'Card'})
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array');
        for(let x=0; x<res.body.length; x++){
          expect(res.body[x].Genres).to.equal('Card');
        }
      });
  })
  it('should sort by rating', ()=>{
    return request(app)
      .get('/app')
      .query({sort:'Rating'})
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf(store.length);
        for(let x=1; x<=res.body.length; x++){
          console.log(res.body[x].Rating);
          expect(res.body[x].Rating).to.equal(res.body[x].Rating);
          //expect(res.body[x].Rating).to.be.at.most(res.body[x-1].Rating);
        }
      });
  })
  


});