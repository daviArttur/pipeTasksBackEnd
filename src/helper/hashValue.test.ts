/* eslint-disable no-useless-escape */
import bcripty from "bcryptjs";
import hashValue from "./hashValue";

test("function generate hash for password", () => {
  const password = "@d3C5A!/";
  const hash = hashValue(password);
  
  const compareHash = bcripty.compareSync(password, hash);

  expect(compareHash).toBeTruthy();
});