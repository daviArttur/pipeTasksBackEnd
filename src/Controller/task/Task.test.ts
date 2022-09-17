
import mongoose from "mongoose";
import { Task } from "./Task";

// Model
import { taskModel } from "../../Models/task/taskModel";

// Connect Test DB
import connect from "../../helper/test/connect";

// Types
import type { DeleteResult, UpdateResult } from "mongodb";

const newTask = {
  userId: "630b95baeeca6dd5312d45ed",
  title: "Search in database",
  description: "I need you to run the database searches",
};

describe("" , () => {

  afterAll( async () => {
    await mongoose.disconnect();
  });

  beforeAll( async () => {
    await connect();
  });

  it("should return 3 tasks using getAll method", async () => {
    const createSixUsers = [ 1, 2, 3, 4 ];
    createSixUsers.map( async () => {
      await new Task(newTask).save();
    });
    const resultQueryTasks = await Task.getAll(newTask.userId, 3);

    await taskModel.deleteMany({ userId: newTask.userId });
    expect(resultQueryTasks).toHaveLength(3);
  });

  it("should be possible update existent task", async () => {
    const { content } = await new Task(newTask).save();
    const uptateTask = { 
      title: "example_title",
      description: "update description using the update method of the Task class" ,
      finished: {
        status: true,
        at: new Date()
      }
    };

    const updatedTask: UpdateResult = await Task.update({ _id: content!._id, userId: content!.userId }, uptateTask);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getTaskUpdated: any = await Task.getOne({ _id: content!._id, userId: content!.userId });
    expect(getTaskUpdated.description).toBe(uptateTask.description);
    expect(getTaskUpdated.title).toBe(uptateTask.title);
    expect(getTaskUpdated.finished.status).toBe(uptateTask.finished.status);
    expect(getTaskUpdated.finished.at).toBeTruthy();
    expect(updatedTask.acknowledged).toBe(true);
    expect(updatedTask.matchedCount).toBe(1);
    expect(updatedTask.modifiedCount).toBe(1);

    await Task.delete({ _id: content!._id, userId: content!.userId });
  });

  it("should be possible create a new task", async () => {
    const createdTask = await new Task(newTask).save();
    
    expect(createdTask.content!.userId).toBeTruthy();
    expect(createdTask.content!.createdAt).toBeTruthy();
    expect(createdTask.content!.description).toBe(newTask.description);
    expect(createdTask.content!.title).toBe(newTask.title);
    expect(createdTask.content!.finished!.status).toBeFalsy();
    await Task.delete({ _id: createdTask.content!._id, userId: createdTask.content!.userId });
  });

  it("should delete the task using arguments sended", async () => {
    const createTask = await new Task(newTask).save();

    const deletedTask: DeleteResult = await Task.delete({ _id: createTask.content!._id, userId: createTask.content!.userId });

    expect(deletedTask.deletedCount).toBe(1);
    expect(deletedTask.acknowledged).toBe(true);
  });
});