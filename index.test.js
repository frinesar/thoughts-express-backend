const request = require("supertest");
const DB = require("./db");
const app = require("./app");
const uuid = require("uuid");

describe("Test the root path", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get("/test");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("message", "Working");
  });
});

describe("Test user creation and retrieving", () => {
  beforeAll(() => {
    DB.connectDB();
  });

  let id = "";

  test("Create new user", async () => {
    const response = await request(app)
      .post("/api/users")
      .send({ username: uuid.v4(), password: uuid.v4() });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    id = await response.body.id;
  });

  test("Get new user", async () => {
    const response = await request(app).get(`/api/users/${id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id", id);
  });

  test("Update new user username", async () => {
    const response = await request(app)
      .put(`/api/users/${id}`)
      .send({ username: "Alex" });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id", id);
    expect(response.body).toHaveProperty("username", "Alex");
  });

  test("Delete new user", async () => {
    const response = await request(app).delete(`/api/users/${id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id", id);
  });

  afterAll(() => {
    DB.disconnectDB();
  });
});
