import dotenv from "dotenv";
dotenv.config();

// App
import app from "../../app";

// Test
import request from "supertest";

// Db
import mongoose from "mongoose";

// SaveUser
import { cadastryUserSchema } from "../../Schemas/cadastryUserSchema";

// Types
import type { DeleteResult } from "mongodb";

// User Objects
import UserObjectExample from "../../helper/UserObjectExample";
import { UserExistentInDb } from "../../helper/test/UserExistentInDb";

describe("integration test for user registration", () => {
  const { name, surname, email, password } = UserObjectExample;
  const User = { name, surname, email, password };
  
  afterAll( async () => {
    await mongoose.disconnect();
  });

  it("must be possible to register the user", async () => {
    const { body, status } = await request(app)
      .post("/cadastry")
      .send(User);

    const model = mongoose.model("user", cadastryUserSchema);
    const deleteUser: DeleteResult = await model.deleteOne({ email: User.email });

    expect(body.message).toBeTruthy();
    expect(status === 201).toBeTruthy();
    expect(deleteUser.deletedCount === 1).toBeTruthy();
  });

  it("return status 406 to existing user in DB ", async () => {
    const { status, body } = await request(app)
      .post("/cadastry")
      .send(UserExistentInDb);

    expect(body.errors).toBeTruthy();
    expect(status === 406).toBeTruthy();
  });

  it("must return status 400 to ma invalid body", async () => {
    const { status, body } = await request(app)
      .post("/cadastry")
      .send({ name: "Exam ple", surname: "12Ge", email: "aa11asd@;_.com", password: " " });

    expect(body.errors.length === 4).toBeTruthy();
    expect(status === 400).toBeTruthy();
  });
});