import cadastryUser from "./cadastryUserModel";
import bcrypt from "bcryptjs";
import UserObjectExample from "../../../helper/UserObjectExample";

it("test method hash password before cadastry user", () => {
  const { password } = UserObjectExample;
  const User = new cadastryUser({ ...UserObjectExample });
  
  const comparePasswordWith = bcrypt.compareSync(password, User.hashCompare);
  expect(comparePasswordWith).toBeTruthy();

  const compareHashedPasswordWithHashedPasswordHash = bcrypt.compareSync(User.hashCompare, User.hashPassword());
  expect(compareHashedPasswordWithHashedPasswordHash).toBeTruthy();
});