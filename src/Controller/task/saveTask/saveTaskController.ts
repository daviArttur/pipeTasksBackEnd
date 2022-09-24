import { Task } from "../Task";

// Types
import type { saveTaskRequestType, saveTaskResponseType } from "src/interface/task/postTaskInterface";
import type { ICreateTask } from "../../../Models/task/taskModel";
import type { NextFunction } from "express";

class Controller {
  private task: ICreateTask;
  private res: saveTaskResponseType;
  private next: NextFunction;

  constructor(req: saveTaskRequestType, res: saveTaskResponseType, next: NextFunction) {
    this.task = req.body;
    this.res = res;
    this.next = next;
  }

  public async save() {
    try {
      const savedTask = await new Task(this.task).save();
      if (savedTask.err) throw new Error(savedTask.message);
      return this.res.status(201).json({ content: savedTask.content });
    } catch (err) {
      return this.next(err);
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleErrors = (err: Error, _req: saveTaskRequestType, res: saveTaskResponseType, _next: NextFunction) => {
  return res.status(500).json({ errors: err.message });
};

const saveTaskController = async (req: saveTaskRequestType, res: saveTaskResponseType, next: NextFunction) => {
  await new Controller(req, res, next).save();
};

export { saveTaskController, handleErrors };