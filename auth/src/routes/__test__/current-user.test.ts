import request from "supertest";
import { app } from "../../app";

it("should respond with the detail about the current user", async () => {
  const authCookie = await global.getAuthCookie();

  const currentUserResponse = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", authCookie)
    .expect(200);

  expect(currentUserResponse.body.currentUser.email).toEqual("test@test.com");
});

it("should respond with null if not authenticated", async () => {
  const res = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", [])
    .send()
    .expect(401);

  expect(res.body.currentUser).toBeUndefined();
});
