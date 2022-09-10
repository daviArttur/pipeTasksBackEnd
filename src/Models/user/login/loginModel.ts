import mongoose from "mongoose";
import { schema } from "../../../Schemas/loginSchema";

const model = mongoose.model("users", schema);

export class loginModel {
  #id: string;

  constructor(id: string) {
    this.#id = id;
  }

  async findUser() {
    const queryResult = await model.findById(this.#id);
    return queryResult?.toObject();
  }
}