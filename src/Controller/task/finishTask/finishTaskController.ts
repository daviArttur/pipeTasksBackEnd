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

  public async update() {
    const _id = this.task.taskId;
    const userId = this.userId;

    try {
      const savedTask = await Task.update({ _id, userId }, { finished: { at: new Date, status: true } });
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

const finishTaskController = async (req: IUpdateTaskRequest, res: IUpdateTaskResponse, next: NextFunction) => {
  return await new Controller(req, res, next).update();
};

export { handleErrors, finishTaskController };