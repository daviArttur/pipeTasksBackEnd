import { ObjectId } from "mongodb";
import { ITask, taskModel } from "../../Models/task/taskModel";

type IGetOneTask = Pick<ITask, "userId" | "_id">
type IDeleteTask = Pick<ITask, "userId" | "_id">
type IUpdateTask = Partial<Omit<ITask, "createdAt" | "_id" | "userId">>
type ICreateTask = Omit<ITask, "_id" | "finished" | "createdAt">

class Task {
  private task: ICreateTask;

  constructor(task: ICreateTask) {
    this.task = task;
  }

  public static async getAll(userId: string, queryLimit: number) {
    try {
      const search = await taskModel.find<ITask>({ userId }, {}, { limit: queryLimit ?? 6 });
      return search;
    } catch (err) {
      return { err: true, message: err.message };
    }
  }

  public static async getOne({ userId, _id }: IGetOneTask) {
    try {
      const search = await taskModel.findOne<ITask>({ userId, _id });
      return search;
    } catch (err) {
      return { err: true, message: err.message };
    }
  }

  public async save() {
    try {
      const Task = new taskModel(this.task);
      const savedTask = await Task.save();
      return { err: false, content: savedTask };
    } catch (err) {
      return { err: true, message: err.message };
    }
  }

  public static async update({ _id, userId }: Pick<ITask, "userId" | "_id">, task: IUpdateTask) {
    try {
      const updatedTask = await taskModel.findOne({ _id, userId }).updateOne({ ...task });
      if (!updatedTask) throw new Error(updatedTask);
      return { err: false, content: updatedTask };
    } catch (err) {
      return { err: true, message: err.message };
    }
  }

  public static async finish({ _id, userId }: Pick<ITask, "userId" | "_id">) {
    try {
      const finishedTask = await taskModel.findOne({ _id, userId }).updateOne({ finished: { status: true, at: new Date() } });
      if (!finishedTask) throw new Error(finishedTask);
      return { err: false, content: finishedTask };
    } catch (err) {
      return { err: true, message: err.message };
    }
  }

  public static async delete({ _id, userId }: IDeleteTask) {
    try {
      const deletedTask = await taskModel.deleteOne({ userId, _id: new ObjectId(_id) });
      if (!deletedTask) throw new Error();
      return deletedTask;
    } catch (err) {
      return err;
    }
  }
}

export interface ITasks {
  userId: string,
  title: string,
  description: string,
  createdAt: Date,
  finished: {
    status: boolean,
    at: Date
  }
  status: boolean
}

export { Task };