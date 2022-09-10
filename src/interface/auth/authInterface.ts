import { Request, Response } from "express";
import { Result, ValidationError } from "express-validator";

export type AuthResponseType = Response<{
  token?: string,
  message?: string,
  errors?: Result<ValidationError>
}>

export interface AuthRequestType extends Request {
  body: {
    email: string,
    password: string
  }
}