import jwt from "jsonwebtoken";
import UserObjectExample from "../UserObjectExample";
import createJwtToken from "./createJwtToken";

type decodedTokenType = {
  id: string,
  iat: number
}

test("function create token", () => {
  const { id } = UserObjectExample;
  const token = createJwtToken(id);
  const decode = jwt.decode(token) as decodedTokenType;
  expect(decode.id).toBe(id);
});