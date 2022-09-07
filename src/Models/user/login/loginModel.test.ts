import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import connect from "../../../helper/test/connect";
import UserObjectExample from "../../../helper/UserObjectExample";
import LoginModel from "./loginModel";
const { name, surname, email, password } = UserObjectExample;

describe("asdasd", () => {
  
  afterEach( async () => {
    await mongoose.disconnect();
  });
  
  it("Schema must return object with e-mail and client string", async () => {
    await connect(process.env.DB_USER!, process.env.DB_PASS!);
    const Login = new LoginModel( email, password ).createQuery();

    expect(Login.email).toBe(email);
    expect(Login.password).toBe(password);
  });
});