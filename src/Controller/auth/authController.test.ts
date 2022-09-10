//  Authentication Route
import app from "../../app";

// Test
import request from "supertest";
import mongoose from "mongoose";

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

  it("should return status 400 for bad request", async () => {
    
    const { body, status } = await request(app)
      .post("/auth")
      .send({ 
        email: "qweqweqw",
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
        email: "default@example.com",
        password: "D3f@ltP3"
      });

    expect(status).toBe(200);
    expect(body.errors).toBeFalsy();
    expect(body.token).toBeTruthy();
  });
});