import { Request, Response } from "express";
import { DeleteResult } from "mongodb";

export type resetPasswordResponseType = Response<{
  content?: string | DeleteResult;
  message?: string;
  errors?: string
}>

export interface resetPasswordRequestType extends Request {
  body: {
    email: string
  }
}