// Orm
import mongoose, { Schema, ObjectId, Date } from "mongoose";

type SchemaTypeReturn = mongoose.Schema<{
  name: string,
  surname: string,
  email: string, 
  password: string
  id: ObjectId
  created: Date
}>

export const schema: SchemaTypeReturn = new Schema({
  id: {
    type: String,
    required: true
  }
});