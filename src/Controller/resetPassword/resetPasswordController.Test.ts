// Model
import { userModel } from "../../Models/user/user";

// Test
import request from "supertest";

// User example
import UserObjectExample from "../../helper/UserObjectExample";

// App
import app from "../../app";

// Orm
import mongoose from "mongoose";

describe("integration test for resetPasswordController", () => {
  const { email, name, surname, password } = UserObjectExample;
  const User = { email, name, surname, password };

  afterAll( async () => {
    await mongoose.disconnect();
  });

  it("should be possible to send email to user who lost the password ", async () => {
    await request(app)
      .post("/cadastry")
      .send(User);

    const token = await request(app)
      .post("/cadastry")
      .send({ email, password });

    const { body, status } = await request(app)
      .post("/resetPassword")
      .set("Authorization", "Bearer "+token.body.token)
      .send({ email });

    await userModel.deleteOne({ email });
    expect(body.message).toBe("email sent successfully");
    expect(status).toBe(200);
  }, 15000);
});