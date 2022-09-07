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
    const modelUser = mongoose.model("user", userSchema);
    this.userSchema = new modelUser({ ...this.#body });
    return this.userSchema;
  }

  async cadastryUserSchema(): Promise<{ status: number, message: string }> {
    try {
      await this.userSchema.save();
      return { status: 201, message: "Usuário cadastrado com sucesso" };
    } catch (err) {
      const { code, errmsg }: MongoServerError = err;
      const errorObjStatus = new handleErrorDb(code, errmsg);
      this.error = errorObjStatus;
      return this.error;
    }
  }
}

export default cadastryUser;