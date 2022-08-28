import { MongoServerError } from "mongodb";
import mongoose, { Schema } from "mongoose";
import handleErrorDb from "../../../helper/db/handleErrorDb";
import hashValue from "../../../helper/hashValue";

interface IcreateUser {
  name: string,
  surname: string,
  email: string,
  password: string
}

const userSchema = new Schema({
  name: {
    type: String
  },
  surname: {
    type: String
  },
  email: {
    type: String,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    select: false
  },
  created: {
    type: Date,
    default: Date.now(),
    immutable: true
  }
});

class cadastryUser {
  #body: IcreateUser;
  error: null | { status: number, message: string };
  userSchema: mongoose.Document<unknown, unknown, IcreateUser>;
  hashCompare: string;

  constructor(body: IcreateUser) {
    this.#body = body;
    this.hashCompare;
    this.hashPassword();
    this.createSchema();
    this.error = null;
  }

  hashPassword() { 
    this.#body.password = hashValue(this.#body.password);
    this.hashCompare = this.#body.password;
    return this.#body.password;
  }

  async createSchema() {
    const modelUser = mongoose.model("users", userSchema);
    this.userSchema = new modelUser({ ...this.#body });
    return this.userSchema;
  }

  async cadastryUserSchema() {
    try {
      const UserSave = await this.userSchema.save();
      return UserSave;
    } catch (err) {
      const { code, errmsg }: MongoServerError = err;
      const errorObjStatus = new handleErrorDb(code, errmsg);
      this.error = errorObjStatus;
      return this.error;
    }
  }
}

export default cadastryUser;