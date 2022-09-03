import { ObjectID } from "bson";
import mongoose, { Schema } from "mongoose";


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

const loginSchema = mongoose.model("users", schema);

class LoginModel{
  #email: string;
  #password: string;
  query: { email: string, password: string} & {_id: ObjectID};

  constructor(email: string, password: string) {
    this.#email = email, 
    this.#password = password;
    this.createQuery();
  }

  createQuery() {
    this.query = new loginSchema({ email: this.#email, password: this.#password });
    return this.query;
  }

  findUser() {
    return loginSchema.findOne({ email: this.query.email });
  }
}

export default LoginModel;