import mongoose, { Schema } from "mongoose";

type IUser = {
  name: string,
  surname: string,
  email: string,
  password: string,
  created: Date
}

export const schema = new Schema<IUser>({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    select: false,
    required: true
  },
  created: {
    type: Date,
    default: Date.now(),
    immutable: true
  }
});

const userModel = mongoose.model<IUser>("User", schema, "users");

export { userModel };