const chai = require('chai');
const assert = chai.assert;

const server = require('../server');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

suite('Functional Tests', function () {
  this.timeout(5000);
  suite('Integration tests with chai-http', function () {
    // #1
    test('Test GET /hello with no name', function (done) {
      chai
        .request(server)
        .get('/hello')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'hello Guest');
          done();
        });
    });
    // #2
    test('Test GET /hello with your name', function (done) {
      chai
        .request(server)
        .get('/hello?name=xy_z')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'hello xy_z');
          done();
        });
    });
    // // #3
    test('Send {surname: "Colombo"}', function (done) {
      chai
        .request(server)
        .put('/travellers')
        .send(({ surname: 'Colombo'}))
        .end(function (err, res) {
          assert.equal(res.status, 200, 'response status should be 200');
          assert.equal(res.type, 'application/json', 'response should be json');
          assert.equal(res.body.name, 'Cristoforo', 'res.body.name should be "Cristoforo"');
          assert.equal(res.body.surname, 'Colombo', 'res.body.surname should be "Colombo"');

          done();
        });
    });
    // // #4
    test('Send {surname: "da Verrazzano"}', function (done) {
      chai.request(server)
          .put('/travellers')
          .send({ surname: "da Verrazzano"})
          .end(function (err, res) {
            assert.equal(res.status, 200, 'response status should be 200');
            assert.equal(res.type, 'application/json', 'response should be json');
            assert.equal(res.body.name, 'Giovanni', 'res.body.name should be "Giovanni"');
            assert.equal(res.body.surname, 'da Verrazzano', 'res.body.surname should be "da Verrazzano"')

      done();
        });
      });
  });
});

const Browser = require('zombie');

suite('Functional Tests with Zombie.js', function () {
  this.timeout(5000);

  // suite('Headless browser', function () {
  //   test('should have a working "site" property', function() {
  //     assert.isNotNull(browser.site);
  //   });
  // });

  suite('"Famous Italian Explorers" form', function () {  
    // #5
    test('Submit the surname "Colombo" in the HTML form', function (done) {
      Browser.fill('surname', 'Colombo').pressButton('submit', function() {
        Browser.assert.success();
        Browser.assert.text('span#name', 'Cristoforo');
        // assert that the text inside the element 'span#surname' is 'Colombo'
        Browser.assert.text('span#surname', 'Colombo');
        // assert that the element(s) 'span#dates' exist and their count is 1
        Browser.assert.element('span#dates', 1);
        done();
      });

      
    });
    // #6
    test('Submit the surname "Vespucci" in the HTML form', function (done) {
      Browser.fill('surname', 'Vespucci').pressButton('submit', function() {
        // assert that status is OK 200
        Browser.assert.success();
        // assert that the text inside the element 'span#name' is 'Amerigo'
        Browser.assert.text('span#name', 'Amerigo');
        // assert that the text inside the element 'span#surname' is 'Vespucci'
        Browser.assert.text('span#surname', 'Vespucci');
        // assert that the element(s) 'span#dates' exist and their count is 1
        Browser.assert.element('span#dates', 1);

        done();
      });
    });
  });
});
