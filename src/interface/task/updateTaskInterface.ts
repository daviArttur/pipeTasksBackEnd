import { Request, Response } from "express";
import { Result, ValidationError } from "express-validator";
import { IUpdateTask } from "../../Models/task/taskModel";

export interface IUpdateTaskRequest extends Request {
  id: string;
  body: {
    taskId: string;
    title?: string;
    description?: string;
  }
}

export interface IUpdateTaskResponse extends Response {
  body: {
    content?: IUpdateTask
    errors?: string[] | Result<ValidationError>[] 
  }
}