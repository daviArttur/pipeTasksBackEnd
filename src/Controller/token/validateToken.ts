import { DecodeToken } from "../../helper/jsonwt/tokenValidate";
import { LoginRequestType, LoginResponseType } from "src/interface/login/loginInterface";
import { NextFunction } from "express";

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