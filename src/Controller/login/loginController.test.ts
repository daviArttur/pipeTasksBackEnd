import dotenv from "dotenv";
dotenv.config();

// App
import app from "../../app";

// Test
import request from "supertest";

// User example
import { UserExistentInDb } from "../../helper/test/UserExistentInDb";

describe("integration test for login route", () => {

  const { name, surname, email, password, id, created } = UserExistentInDb;
  it("should return 400 for bad request", async () => {
    const response = await request(app)
      .get("/login")
      .set("Authorization", "Bearer 327824352vbc29cb2");

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeTruthy();
  });

  it("should return user data if token validy", async () => {
    const { body } = await request(app)
      .post("/auth")
      .send({
        email,
        password
      });
    
    const response = await request(app)
      .get("/login")
      .set("Authorization", "Bearer "+body.token);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      data: {
        name,
        surname,
        id,
        email,
        created
      }
    });
  });

  it("must return status 403 if authorization in the header is valid", async () => {
    const { body } = await request(app)
      .post("/auth")
      .send({
        email,
        password
      });
    
    const response = await request(app)
      .get("/login")
      .set("Authorization", "Bearer s"+body.token);

    expect(response.status).toBe(403);
    expect(response.body.errors).toBeTruthy();
  });
});