import jwt from "jsonwebtoken";
import UserObjectExample from "../UserObjectExample";
import dotenv from "dotenv";
import { DecodeToken } from "./tokenValidate";
dotenv.config();

describe("test helper function token validate", () => {
  const tenHours = 60 * 60 * 10;
  const mockId = UserObjectExample.id;
  const token = jwt.sign({ id: mockId }, process.env.JWT_SECRET!, { expiresIn: tenHours });

  it("should return id for validy token", () => {
    const decodedToken = new DecodeToken("Bearer "+token).decode();

    expect(decodedToken.id).toBe(mockId);
    expect(decodedToken.errors).toBeUndefined();
    expect(decodedToken.status).toBe(200);
  });

  it("should return status 400 if malformed token", () => {
    const id = new DecodeToken("Bearer 784bc72biv912jf0").decode();

    expect(id.status).toBe(400);
    expect(id).toHaveProperty("errors");
    expect(id).not.toHaveProperty("id");
  });

  it("should return status 403 if token expired", () => {
    const expiredToken = jwt.sign({ id: mockId }, process.env.JWT_SECRET!, { expiresIn: -100 });
    const id = new DecodeToken("Bearer "+expiredToken).decode();

    expect(id.status).toBe(403);
    expect(id).toHaveProperty("errors");
    expect(id).not.toHaveProperty("id");
  });

  it("should return error if token invalid key", () => {
    const invalidToken = jwt.sign({ id: mockId }, "asdqw", { expiresIn: tenHours });
    const id = new DecodeToken("Bearer "+invalidToken).decode();

    expect(id.status).toBe(403);
    expect(id).toHaveProperty("errors");
    expect(id).not.toHaveProperty("id");
  });
});