import app from "../../../app";
import request from "supertest";
import { UserExistentInDb } from "../../../helper/test/UserExistentInDb";


describe("integration test fot get tasks", () => {

  const { email, password } = UserExistentInDb;

  it("should be possible get tasks", async () => {
    const token = await request(app).post("/auth").send({ 
      email,
      password
    });

    const response = await request(app)
      .get("/task/get/3")
      .set("Authorization", "Bearer "+token.body.token);

    expect(response.body.content).toBeTruthy();
  });
});