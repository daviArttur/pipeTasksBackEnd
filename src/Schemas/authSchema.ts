import mongoose, { Schema } from "mongoose";
import type { ObjectID } from "bson";

type SchemaTypeReturn = mongoose.Schema<{
  name: string,
  surname: string,
  email: string, 
  password: string
  _id: ObjectID
}>

export const schema: SchemaTypeReturn = new Schema({
  email: {
    type: String,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});