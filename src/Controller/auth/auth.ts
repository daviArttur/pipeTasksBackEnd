import dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";
import createJwtToken from "../../helper/jwt/createJwtToken";
import ComparePassword from "../../helper/login/comparePassword";

async function authController (req: Request, res: Response) {
  const { email, password } = req.body;

  const { status, message, id } = await new ComparePassword(email, password).getUserDb();
  
  if (status === 200 && id) {
    const token = createJwtToken(id);
    return res.status(status).json({ token: token });
  } else if (status === 404 && message) {
    return res.status(status).json({ message: message });
  } else {
    return res.status(500).end();
  }
}

export default authController;