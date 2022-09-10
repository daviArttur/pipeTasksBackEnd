import mongoose from "mongoose";
import connect from "../../../helper/test/connect";
import { loginModel } from "./loginModel";

describe("test Model for user login", () => {

  beforeAll( async () => {
    await connect();
  });

  afterAll( async () => {
    mongoose.disconnect();
  });

  const idQueryParam = "631cd4f4d272977b24be19f3";

  it("schema should return user", async () => {
    const User = await new loginModel(idQueryParam).findUser();

    expect(User!.name).toBe("default");
    expect(User!.surname).toBe("default");
    expect(User!.email).toBe("default@example.com");
  });
});