import dotenv from "dotenv";
dotenv.config();

// User example
import UserObjectExample from "../../../helper/UserObjectExample";

// Orm
import mongoose from "mongoose";

// Compare password
import ComparePassword from "./comparePassword";

describe("test help function comparePassword", () => {
  const { email, password, hash, id } = UserObjectExample;

  afterEach( async () => {
    await mongoose.disconnect();
  });

  it("Compare password using bcrypt, should return status 200 more message content id", async () => {
    const compare = new ComparePassword(email, password).compareHashPassword(hash, id);
  
    expect(compare).toEqual({ status: 200, id: id });
  });

  it("User password not corretct, should return 403", async () => {
    const wrongPassword = "89fbdsbjkd";
    const compare =  new ComparePassword(email, wrongPassword).compareHashPassword(hash, id);
  
    expect(compare).toEqual({ status: 403, message: "Email ou senha inválidos" });
  });
});