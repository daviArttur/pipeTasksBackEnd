import { Request, Response } from "express";

export type setNewPasswordResponseType = Response<{
  content?: string;
  message?: string;
  errors?: string
}>

export interface setNewPasswordRequestType extends Request {
  body: {
    password: string
    id: string
  }
}