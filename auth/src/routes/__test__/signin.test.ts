import request from "supertest";
import { app } from "../../app";

it("should return 400 on email that doesn't exists", async () => {
  return request(app)
    .post("/api/users/signin")
    .send({
      email: "test@gmail.com",
      password: "password123",
    })
    .expect(400);
});

it('should return 400 if no req.body i.e no "email" and "password"', async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
    })
    .expect(400);

  await request(app)
    .post("/api/users/signin")
    .send({
      password: "123456",
    })
    .expect(400);

  return request(app).post("/api/users/signup").expect(400);
});

it("should fail with incorrect password is supplied", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "12345",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "123abc",
    })
    .expect(400);
});

it("should response with cookie on successful login", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "12345",
    })
    .expect(201);

  const res = await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "12345",
    })
    .expect(200);

  expect(res.get("Set-Cookie")).toBeDefined();
});
