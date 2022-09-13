import { ObjectID } from "bson";
import { Request, Response } from "express";
import { ValidationError } from "express-validator";
import { Date, Schema } from "mongoose";

export type userObjectData = {
  _id?: ObjectID | Schema.Types.ObjectId,
  name: string,
  surname: string,
  email: string,
  created: Date
}

export type LoginResponseType = Response<{
  data?: userObjectData,
  errors?: ValidationError[] | string
}>

export interface LoginRequestType extends Request {
  body: {
    id: string
  }
}