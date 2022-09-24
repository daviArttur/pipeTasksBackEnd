// Orm
import mongoose, { ObjectId, Schema } from "mongoose";

type SchemaTypeReturn = mongoose.Schema<{
  name: string,
  surname: string,
  email: string, 
  password: string
  _id: ObjectId
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