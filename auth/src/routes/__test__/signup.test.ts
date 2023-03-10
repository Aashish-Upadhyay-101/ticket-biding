import request from "supertest";
import { app } from "../../app";

it("should return 201 on successful signup", async () => {
    return request(app)
    .post("/api/users/signup")
    .send({
        email: "test@test.com",
        password: "password",
    })
    .expect(201)
})

it("should return 400 on invalid email", async () => {
    return request(app)
    .post("/api/users/signup")
    .send({
        email: "abc.com",
        password: "password123",
    })
    .expect(400)
})

it("should return 400 on invalid password", async () => {
    return request(app)
    .post("/api/users/signup")
    .send({
        email: "test@test.com",
        password: "1a",
    })
    .expect(400)
})

it("should return 400 if no req.body i.e no \"email\" and \"password\"", async () => {
    await request(app)
    .post("/api/users/signup")
    .send({
        email: "test@test.com",
    })
    .expect(400)

    await request(app)
    .post("/api/users/signup")
    .send({
        password: "123456",
    })
    .expect(400)

    return request(app)
    .post("/api/users/signup")
    .expect(400)
})