
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

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
  
  it("Schema must return object with e-mail and password on string format for query search", async () => {
    const Authentication = new authModel("default@example.com");

    Authentication.createQuery();

    expect(Authentication.query.email).toBe("default@example.com");
  });

  it("should return object with data of user", async () => {
    const result = await new authModel("default@example.com").findUser();

    const User = result?.toObject();

    expect(User!.name).toBe("default");
    expect(User!.surname).toBe("default");
    expect(User!.email).toBe("default@example.com");
    expect(User!.password).toBeTruthy();
    expect(User!._id).toBeTruthy();
  });
});