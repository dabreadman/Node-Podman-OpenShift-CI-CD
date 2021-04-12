const { error } = require("selenium-webdriver");
const request = require("supertest");
const app = require("../server");

describe("Test the root path", () => {
  test("GET /", async (done) => {
    request(app)
      .get("/")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      })
      .catch(error);
  });
});

describe("Test the wrong route", () => {
  test("GET /testing-will-fail", async (done) => {
    request(app)
      .get("/testing-will-fail")
      .then((response) => {
        expect(response.statusCode).toBe(404);
        done();
      })
      .catch(error);
  });
});

afterAll((done) => {
  app.close();
  done();
});
