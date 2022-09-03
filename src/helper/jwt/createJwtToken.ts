import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const createJwtToken = (id: string) => {
  const tenHours = 60 * 60 * 10;
  const token = jwt.sign({ id: id }, process.env.JWT_SECRET!, { expiresIn: tenHours });
  return token;
};

export default createJwtToken;