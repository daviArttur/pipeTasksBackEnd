import dotenv from "dotenv";
dotenv.config();

// Helper Functions
import ComparePassword from "../../Models/user/auth/comparePassword";
import createJwtToken from "../../helper/jwt/createJwtToken";

// Types
import type { AuthRequestType, AuthResponseType } from "../../interface/auth/authInterface";
import type { NextFunction } from "express";
import { validationResult } from "express-validator";

export const bodyValidation = (req: AuthRequestType, res: AuthResponseType, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors });
  }
  return next();
};

export async function authController (req: AuthRequestType, res: AuthResponseType) {
  const { email, password } = req.body;
  const { status, message, id } = await new ComparePassword(email, password).getUserDb();
 
  if (status === 200 && id) {
    const token = createJwtToken(id);
    return res.status(status).json({ token: token });
  } else if (status === 403 && message) {
    return res.status(status).json({ message: message });
  } else {
    return res.status(500).end();
  }
}