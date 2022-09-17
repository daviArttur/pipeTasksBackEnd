import { Request, Response } from "express";
import { Result, ValidationError } from "express-validator";
import { ICreateTask, ITask } from "../../Models/task/taskModel";

export type saveTaskResponseType = Response<{
  content?: ITask,
  message?: string,
  errors?: Result<ValidationError> | string
}>

export interface saveTaskRequestType extends Request {
  body: ICreateTask;
}