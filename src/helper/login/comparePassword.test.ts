import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
import UserObjectExample from "../UserObjectExample";
import ComparePassword from "./comparePassword";

describe("test help function comparePassword", () => {
  const { email, password, hash, id } = UserObjectExample;

  it("Compare password using bcrypt, should return status 200 more message content id", async () => {
    const compare = new ComparePassword(email, password).compareHashPassword(hash, id);
  
    expect(compare).toEqual({ status: 200, id: "630b95baeeca6dd5312d45ed" });
  });

  it("User password not corretct, should return 404", async () => {
    const wrongPassword = "89fbdsbjkd";
    const compare = new ComparePassword(email, wrongPassword).compareHashPassword(hash, id);
  
    expect(compare).toEqual({ status: 404, message: "Email ou senha inválidos" });
  });

  it("User not exist, should return 404", async () => {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xjw0jbt.mongodb.net/?retryWrites=true&w=majority`);
    
    const wrongEmail = "133@asd83@ex.com";
    const compare = await new ComparePassword(wrongEmail, password).getUserDb();

    expect(compare).toEqual({ status: 404, message: "Email ou senha inválidos" });
    mongoose.disconnect();
  });
});