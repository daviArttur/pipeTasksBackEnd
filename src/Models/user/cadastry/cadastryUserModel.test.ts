import dotenv from "dotenv";
dotenv.config();
import cadastryUser from "./cadastryUserModel";
import bcrypt from "bcryptjs";
import UserObjectExample from "../../../helper/UserObjectExample";
import connect from "../../../helper/test/connect";
import mongoose from "mongoose";
import { UserExistentInDb } from "../../../helper/test/UserExistentInDb";

const newUser = { 
  name: "Marks",
  surname: "Alves",
  email: "marksalves@example.com",
  password: "F73b2D"
};

describe("unit test for cadastryUserModel.test.ts", () => {

  beforeEach( async () => {
    await connect(process.env.DB_USER!, process.env.DB_PASS!);
  });

  afterEach( async () => {
    await mongoose.disconnect();
  });

  const { name, surname, email, password } = UserExistentInDb;

  it("it must add a hash to the password", () => {
    const { password } = UserObjectExample;
    const User = new cadastryUser({ ...UserObjectExample });
    
    const comparePasswordWith = bcrypt.compareSync(password, User.hashCompare);
    expect(comparePasswordWith).toBeTruthy();
  
    const compareHashedPasswordWithHashedPasswordHash = bcrypt.compareSync(User.hashCompare, User.hashPassword());
    expect(compareHashedPasswordWithHashedPasswordHash).toBeTruthy();
  });

  it("should be possible to register user", async () => {
    const response = new cadastryUser(newUser);
    const UserSaveStatus = await response.cadastryUserSchema();
    
    expect(UserSaveStatus.status === 201).toBeTruthy();
    
    const deleteUser = await response.userSchema.deleteOne();
    expect(deleteUser).toBeTruthy();
  });

  it("should return status error 406 if the user already exists", async () => {
    const response = new cadastryUser({ name, surname, email, password });
    const UserSaveStatus = await response.cadastryUserSchema();
    
    expect(UserSaveStatus.status === 406).toBeTruthy();
  });
});