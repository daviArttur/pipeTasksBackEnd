import app from "../../app";
import dotenv from "dotenv";
dotenv.config();
import request from "supertest";

describe("integration test for login route", () => {

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
        email: "default@example.com",
        password: "D3f@ltP3"
      });
    
    const response = await request(app)
      .get("/login")
      .set("Authorization", "Bearer "+body.token);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      data: {
        name: "default",
        surname: "default",
        id: "631cd4f4d272977b24be19f3",
        email: "default@example.com",
        created: "2022-09-07T21:09:22.087+00:00"
      }
    });
  });

  it("should return user data if token validy", async () => {
    const { body } = await request(app)
      .post("/auth")
      .send({
        email: "default@example.com",
        password: "D3f@ltP3"
      });
    
    const response = await request(app)
      .get("/login")
      .set("Authorization", "Bearer s"+body.token);

    expect(response.status).toBe(403);
    expect(response.body.errors).toBeTruthy();
  });
});