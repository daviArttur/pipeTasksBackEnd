import { Task } from "../Task";

// Require
import require from "supertest";

// App
import app from "../../../app";

// User exaple
import { UserExistentInDb } from "../../../helper/test/UserExistentInDb";

// Connect Db
import connect from "../../../helper/test/connect";

// Orm
import mongoose from "mongoose";

describe("integration test for updateTask", () => {

  beforeAll(async () => {
    await connect();
  });

  afterAll( async () => {
    await mongoose.disconnect();
  });
  
  const newTaskExample = {
    title: "New Task Exemple",
    description: "New Task Example, New Task Example, New Task Example, New Task Example",
  };

  const updateTaskExample = {
    title: "Update Task Exemple",
    description: "Update Task, Update Task, Update Task, Update Task, Update Task"
  };

  it("should be possible update a task", async () =>  {
    const token = await require(app)
      .post("/auth")
      .send({
        email: UserExistentInDb.email,
        password: UserExistentInDb.password 
      });

    const newTask = await require(app)
      .post("/task/create")
      .set("Authorization", "Bearer "+token.body.token)
      .send({ ...newTaskExample, userId: UserExistentInDb.id });

    const { status, body } = await require(app)
      .patch("/task/update")
      .set("Authorization", "Bearer "+token.body.token)
      .send({ ...updateTaskExample, taskId: newTask.body.content._id });
    await Task.delete({ userId: UserExistentInDb.id , _id: newTask.body.content._id });

    expect(body.acknowledged).toBeTruthy();
    expect(body.modifiedCount).toBe(1);
    expect(body.matchedCount).toBe(1);
    expect(status).toBe(200);
  });

  it("should return status 400 for", async () => {
    const token = await require(app)
      .post("/auth")
      .send({
        email: UserExistentInDb.email,
        password: UserExistentInDb.password 
      });

    const newTask = await require(app)
      .post("/task/create")
      .set("Authorization", "Bearer "+token.body.token)
      .send({ ...newTaskExample, userId: UserExistentInDb.id });

    const { status, body } = await require(app)
      .patch("/task/update")
      .set("Authorization", "Bearer "+token.body.token)
      .send({ ...updateTaskExample });

    await Task.delete({ userId: UserExistentInDb.id , _id: newTask.body.content._id });
    expect(body.errors).toBeTruthy();
    expect(status).toBe(400);
  });
});