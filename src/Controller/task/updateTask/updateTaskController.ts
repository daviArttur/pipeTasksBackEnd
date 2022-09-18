import { NextFunction } from "express";
import { IUpdateTask } from "../../../Models/task/taskModel";
import { IUpdateTaskResponse, IUpdateTaskRequest } from "../../../interface/task/updateTaskInterface";
import { Task } from "../Task";


class Controller {
  private task: IUpdateTask;
  private userId: string;
  private res: IUpdateTaskResponse;
  private next: NextFunction;

  constructor(req: IUpdateTaskRequest, res: IUpdateTaskResponse, next: NextFunction) {
    this.task = req.body;
    this.userId = req.id;
    this.res = res;
    this.next = next;
  }

  private buildTask() {
    const { description, title, taskId } = this.task;
    const modelUpdateTask = { description, _id: taskId, title, userId: this.userId };
    return modelUpdateTask;
  }

  public async update() {
    const { _id, userId, description, title } = this.buildTask();
    try {
      const savedTask = await Task.update({ _id, userId }, { description, title });
      if (savedTask.err) throw new Error(savedTask.message);
      return this.res.status(200).json(savedTask.content);
    } catch (err) {
      return this.next(err);
    }
  }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleErrors = (err: Error, _req: IUpdateTaskRequest, res: IUpdateTaskResponse, _next: NextFunction) => {
  return res.status(500).json({ errors: err.message });
};

const updateTaskController = async (req: IUpdateTaskRequest, res: IUpdateTaskResponse, next: NextFunction) => {
  return await new Controller(req, res, next).update();
};

export { updateTaskController, handleErrors };