import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import UserObjectExample from "../../../helper/UserObjectExample";
import LoginModel from "./loginModel";

const { name, surname, email, password } = UserObjectExample;

describe("asdasd", () => {
 
  beforeEach( async () => {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xjw0jbt.mongodb.net/?retryWrites=true&w=majority`);
  });

  afterEach(() => {
    mongoose.disconnect();
  });

  it("Schema deve retornar objeto com email e string do cliente", () => {
    const Login = new LoginModel( email, password ).createQuery();

    expect(Login.email).toBe(email);
    expect(Login.password).toBe(password);
  });

  it("Schema deve retornar busca no banco com dados do usuário", async () => {
    const Login = await new LoginModel( email, password ).findUser();

    expect(Login?.toObject().name).toBe(name);
    expect(Login?.toObject().surname).toBe(surname);
    expect(Login?.toObject().email).toBe(email);
    expect(Login?.toObject().password).toBeTruthy();
    expect(Login?.toObject()._id).toBeTruthy();
  });
});