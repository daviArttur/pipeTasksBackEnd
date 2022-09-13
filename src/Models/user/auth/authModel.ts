import mongoose from "mongoose";

import { schema } from "../../../Schemas/authSchema";

const authModel = mongoose.model("authentication", schema, "users");

class AuthSchema{
  #email: string;
  query: { email: string, password: string};

  constructor(email: string) {
    this.#email = email,
    this.createQuery();
  }

  createQuery() {
    this.query = new authModel({ email: this.#email });
    return this.query;
  }

  findUser() {
    const result = authModel.findOne({ email: this.query.email });
    return result;
  }
}

export default AuthSchema;