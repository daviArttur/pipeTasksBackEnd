// Decode token
import { DecodeToken } from "../../helper/jsonwt/tokenValidate";

// Types
import type { NextFunction } from "express";
import type { LoginRequestType, LoginResponseType } from "src/interface/login/loginInterface";

export const validateToken = (req: LoginRequestType & { id: string }, res: LoginResponseType, next: NextFunction) => {
  const tokenInHeader = req.headers.authorization!;

  const { id, errors, status } = new DecodeToken(tokenInHeader).decode();

  if (status === 200 && id) {
    req.id = id;
    return next();
  } else {
    return res.status(status).json({ errors: errors });
  }
};