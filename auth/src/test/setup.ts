import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";
import { globalAgent } from "http";

declare global {
  namespace NodeJS {
    interface Global {
      getAuthCookie(): Promise<string[]>;
    }
  }
}

let mongod: any;
beforeAll(async () => {
  process.env.JWT_KEY = "adsafkja";

  mongod = new MongoMemoryServer();

  await mongod.start();

  const mongoUri = await mongod.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongod.stop();
  await mongoose.connection.close();
});

//global get cookie function
global.getAuthCookie = async () => {
  const email = "test@test.com";
  const password = "12345";

  const authCookie = await request(app)
    .post("/api/users/signup/")
    .send({ email, password })
    .expect(201);

  const cookie = authCookie.get("Set-Cookie");
  return cookie;
};
