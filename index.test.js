const request = require("supertest");
const DB = require("./db");
const app = require("./app");
const uuid = require("uuid");

let id = "";
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

describe("Test user crud and auth", () => {
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

  test("Get new access token for new user", async () => {
    const response = await request(app)
      .get(`/api/users/${id}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ username: "Alex" });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id", id);
    expect(response.body).toHaveProperty("username", "Alex");
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
