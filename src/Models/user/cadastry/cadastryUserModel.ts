import mongoose from "mongoose";

// Schema
import { cadastryUserSchema } from "../../../Schemas/cadastryUserSchema";

// Helper
import handleErrorDb from "../../../helper/db/handleErrorDb";
import hashValue from "../../../helper/hashValue";

// Types
import type { MongoServerError } from "mongodb";

interface IcreateUser {
  name: string,
  surname: string,
  email: string,
  password: string
}

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
    const modelUser = mongoose.model("cadastry", cadastryUserSchema, "users");
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