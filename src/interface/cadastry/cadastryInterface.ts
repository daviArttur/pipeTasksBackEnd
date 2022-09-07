import { Request, Response } from "express";
import { ValidationError } from "express-validator";

export type CadastryResponseType = Response<{
  token?: string,
  message?: string,
  errors?: ValidationError[]
}>

export interface CadastryRequestType extends Request {
  body: {
    name: string,
    surname: string,
    email: string,
    password: string
  }
}