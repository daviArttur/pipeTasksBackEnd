import { Request, Response } from "express";
import { Result, ValidationError } from "express-validator";
import { ITask } from "../../Models/task/taskModel";

export type getTaskResponseType = Response<{
  content: ITask[] | "no tasks" | ITask
  message?: string,
  errors?: Result<ValidationError> | { err: string, message: string }
}>

export interface getTaskRequestType extends Request {
  body: {
    userId: string,
  },
  params: {
    limit: string
  }
}