const { error } = require("selenium-webdriver");
const request = require("supertest");
const app = require('../server');

describe("Test the root path", () => {
    test("Response to the GET method", async (done) => {
      request(app)
        .get("/")
        .then(response => {
          expect(response.statusCode).toBe(200);
          done();
        })
        .catch(error);
    });
  })

  describe("Test the path to stats page", () => {
    test("Response to the GET method", async (done) => {
      request(app)
        .get("/stats")
        .then(response => {
          expect(response.statusCode).toBe(200);
          done();
        })
        .catch(error);
    });
  })

afterAll(done => {
    app.close();
    done();
});