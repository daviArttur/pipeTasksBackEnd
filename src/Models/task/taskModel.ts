import mongoose, { Schema } from "mongoose";

export interface ITask {
  _id: string
  userId: string,
  title: string,
  description: string,
  createdAt: Date,
  finished?: {
    status: boolean,
    at: Date | false
  }
}


const schema = new Schema<ITask>({
  userId: {
    type: String,
    required: true,
    imutable: true
  },
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true
  },
  createdAt: {
    type: Date,
    default: new Date(),
    imutable: true
  },
  finished: {
    status: {
      type: Boolean,
      default: false,
    },
    at: {
      type: Date,
      default: null
    }
  },
});

const taskModel = mongoose.model<ITask>("task", schema, "tasks");

export { taskModel };