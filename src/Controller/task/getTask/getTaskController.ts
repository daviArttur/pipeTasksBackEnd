import { Task } from "../Task";

// Type
import type { NextFunction } from "express";
import type { getTaskRequestType, getTaskResponseType } from "src/interface/task/getTaskInterface";

class Controller {
  private userId: string;
  private limit: number;
  private next: NextFunction;
  private res: getTaskResponseType;

  constructor(req: getTaskRequestType, res: getTaskResponseType, next: NextFunction) {
    this.userId = req.body.userId;
    this.limit = Number(req.params.limit);
    this.res = res;
    this.next = next;
  }

  public async get() {
    try {
      const task = await Task.getAll(this.userId, this.limit);
      if ("err" in task) throw new Error(task.message);
      return this.res.status(200).json({ content: task });
    } catch (err) {
      return this.next(err);
    }
  }
}

const getTaskController = (req: getTaskRequestType, res: getTaskResponseType, next: NextFunction) => {
  return new Controller(req, res, next).get();
};

export { getTaskController };