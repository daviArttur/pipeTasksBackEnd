// Test
import request from "supertest";

// Orm
import mongoose from "mongoose";

// App
import app from "../../../app";

// User example
import { UserExistentInDb } from "../../../helper/test/UserExistentInDb";

describe("integration test for saveTaskController", () => {

  afterAll( async () => {
    await mongoose.disconnect();
  });

  const newTask = {
    userId: UserExistentInDb.id,
    title: "example",
    description: "example example example example example example example example",
  };

  const { email, password } = UserExistentInDb;

  it("should be possible save new task", async () => {
    const response = await request(app)
      .post("/auth")
      .send({
        email,
        password
      });

    const { status, body } = await request(app)
      .post("/task/create")
      .set("Authorization", "Bearer "+response.body.token)
      .send(newTask);
    
    const { title, description, userId, finished } = body.content;
    expect(title).toBe(newTask.title);
    expect(description).toBe(newTask.description);
    expect(userId).toBe(newTask.userId);
    expect(finished.at).toBe(null);
    expect(finished.status).toBe(false);
    expect(status).toBe(201);
  });

  it("should status 400 for bad request", async () => {
    const response = await request(app)
      .post("/auth")
      .send({
        email,
        password
      });

    const { status, body } = await request(app)
      .post("/task/create")
      .set("Authorization", "Bearer "+response.body.token)
      .send("no_data");

    expect(body.errors).toBeTruthy();
    expect(status).toBe(400);
  });
});