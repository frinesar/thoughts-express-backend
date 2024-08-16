const request = require("supertest");
const DB = require("./db");
const app = require("./app");
const uuid = require("uuid");

let id = "";
let reviewID = "";
const username = uuid.v4();
const password = uuid.v4();
let accessToken = "";

describe("Test the root path", () => {
  test("GET method '/test'", async () => {
    const response = await request(app).get("/test");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("message", "Working");
  });
});

describe("User crud + review crud + auth", () => {
  beforeAll(() => {
    DB.connectDB();
  });

  test("Create new user", async () => {
    const response = await request(app)
      .post("/api/users")
      .send({ username, password });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    id = await response.body.id;
  });

  test("Get new user", async () => {
    const response = await request(app).get(`/api/users/${id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id", id);
  });

  test("Login new user", async () => {
    const response = await request(app)
      .post(`/api/users/login`)
      .send({ username, password });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("accessToken");
    accessToken = await response.body.accessToken;
  });

  test("Update new user username", async () => {
    const response = await request(app)
      .put(`/api/users/${id}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ username: "Alex" });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id", id);
    expect(response.body).toHaveProperty("username", "Alex");
  });

  test("Get user reviews", async () => {
    const response = await request(app)
      .get(`/api/reviews`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual([]);
  });

  test("Create new review", async () => {
    const response = await request(app)
      .post(`/api/reviews`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        titleEng: "The Matrix",
        titleRus: "Матрица",
        isViewed: false,
        releaseDate: "1999-03-31T00:00:00.000Z",
        review:
          "Культовый фильм, который изменил представление о научной фантастике.",
      });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("reviewDate");
    reviewID = response.body.id;
  });

  test("Update new review", async () => {
    const response = await request(app)
      .put(`/api/reviews/${reviewID}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        titleEng: "The Matrix",
        titleRus: "Матрица",
        isViewed: false,
        rating: 10,
        releaseDate: "1999-03-31T00:00:00.000Z",
        review:
          "Культовый фильм, который изменил представление о научной фантастике.",
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("rating", 10);
  });

  test("Get user reviews after creation 1 review", async () => {
    const response = await request(app)
      .get(`/api/reviews`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.statusCode).toBe(200);
  });

  test("Delete new review without token", async () => {
    const response = await request(app).delete(`/api/reviews/${reviewID}`);
    expect(response.statusCode).toBe(401);
  });

  test("Delete new review", async () => {
    const response = await request(app)
      .delete(`/api/reviews/${reviewID}`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("titleEng", "The Matrix");
  });

  test("Get user reviews after deletion 1 review", async () => {
    const response = await request(app)
      .get(`/api/reviews`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual([]);
  });

  test("Delete new user", async () => {
    const response = await request(app)
      .delete(`/api/users/${id}`)
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id", id);
  });

  afterAll(() => {
    DB.disconnectDB();
  });
});
