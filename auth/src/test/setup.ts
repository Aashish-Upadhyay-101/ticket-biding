import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";

let mongod: any;
beforeAll(async () => {
    mongod = new MongoMemoryServer();
    const mongoUri = await mongod.getUri();
    
    await mongoose.connect(mongoUri);
})

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        collection.deleteMany({})
    }
})

afterAll(async () => {
    await mongod.stop();
    await mongoose.connection.close();
}) 