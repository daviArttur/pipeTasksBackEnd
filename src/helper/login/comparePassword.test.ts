import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
import UserObjectExample from "../UserObjectExample";
import ComparePassword from "./comparePassword";

describe("test help function comparePassword", () => {
  const { email, password, hash, id } = UserObjectExample;

  afterEach( async () => {
    await mongoose.disconnect();
  });

  it("Compare password using bcrypt, should return status 200 more message content id", async () => {
    const compare = new ComparePassword(email, password).compareHashPassword(hash, id);
  
    expect(compare).toEqual({ status: 200, id: "630b95baeeca6dd5312d45ed" });
  });

  it("User password not corretct, should return 403", async () => {
    const wrongPassword = "89fbdsbjkd";
    const compare =  new ComparePassword(email, wrongPassword).compareHashPassword(hash, id);
  
    expect(compare).toEqual({ status: 403, message: "Email ou senha inválidos" });
  });
});