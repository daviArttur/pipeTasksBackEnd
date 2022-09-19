import app from "../../../app";
import { UserExistentInDb } from "../../../helper/test/UserExistentInDb";
import require from "supertest";
import { Task } from "../Task";
import connect from "../../../helper/test/connect";
import mongoose from "mongoose";

describe("integration test for finishTask", () => {

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
      .patch("/task/finish")
      .set("Authorization", "Bearer "+token.body.token)
      .send({ taskId: newTask.body.content._id });
    await Task.delete({ userId: UserExistentInDb.id , _id: newTask.body.content._id });

    expect(body.acknowledged).toBeTruthy();
    expect(body.modifiedCount).toBe(1);
    expect(body.matchedCount).toBe(1);
    expect(status).toBe(200);
  });
});