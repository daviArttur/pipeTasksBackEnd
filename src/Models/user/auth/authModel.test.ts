
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import { UserExistentInDb } from "../../../helper/test/UserExistentInDb";

// Helper
import connect from "../../../helper/test/connect";

// Model
import authModel from "./authModel";

describe("test authModel methods", () => {
  
  beforeAll( async () => {
    await connect(process.env.DB_USER!, process.env.DB_PASS!);
  });

  afterAll( async () => {
    mongoose.disconnect();
  });

  const { email } = UserExistentInDb;
  
  it("Schema must return object with e-mail and password on string format for query search", async () => {
    const Authentication = new authModel(email);

    Authentication.createQuery();

    expect(Authentication.query.email).toBe(email);
  });

  it("should return object with data of user", async () => {
    const result = await new authModel(email).findUser();

    const User = result?.toObject();

    expect(User!.name).toBe("default");
    expect(User!.surname).toBe("default");
    expect(User!.email).toBe(email);
    expect(User!.password).toBeTruthy();
    expect(User!._id).toBeTruthy();
  });
});