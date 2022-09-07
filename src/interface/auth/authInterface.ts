import { Request, Response } from "express";

export type AuthResponseType = Response<{
  token?: string,
  message?: string
}>

export interface AuthRequestType extends Request {
  body: {
    email: string,
    password: string
  }
}