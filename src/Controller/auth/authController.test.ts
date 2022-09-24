//  Authentication Route
import app from "../../app";

// Test
import request from "supertest";

// Orm
import mongoose from "mongoose";

// User Object
import { UserExistentInDb } from "../../helper/test/UserExistentInDb";

type BodySupertestType = {
  errors: {
    value: string,
    msg: string,
    param: string,
    location: string
  }[]
}

describe("Integration test for authentication route", () => {

  afterAll( async () => {
    await mongoose.disconnect();
  });

  const { email, password } = UserExistentInDb;

  it("should return status 400 for bad request", async () => {
    
    const { body, status } = await request(app)
      .post("/auth")
      .send({ 
        email: "wrongemailfake.com",
        password: "asd asd"
      });

    const { errors } = body.errors as BodySupertestType;
    expect(status).toBe(400);
    expect(errors.length).toBeGreaterThanOrEqual(1);
  });

  it("should return status 200 for validy body and user input data values", async () => {
    const { body, status } = await request(app)
      .post("/auth")
      .send({ 
        email,
        password
      });

    expect(status).toBe(200);
    expect(body.errors).toBeFalsy();
    expect(body.token).toBeTruthy();
  });
});