import { Request, Response } from "express";
import { Result, ValidationError } from "express-validator";
import { DeleteResult } from "mongodb";

export type deleteAccountResponseType = Response<{
  content?: string | DeleteResult;
  message?: string;
  errors?: Result<ValidationError> | { err: string, message: string }
  user?: DeleteResult,
  task?: DeleteResult
}>

export interface deleteAccountRequestType extends Request {
  id: string
}