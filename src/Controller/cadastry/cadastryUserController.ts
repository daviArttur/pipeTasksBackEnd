import cadastryUser from "../../Models/user/cadastry/cadastryUserModel";
import { CadastryRequestType, CadastryResponseType } from "../../interface/cadastry/cadastryInterface";
import { validationResult } from "express-validator";
import { NextFunction } from "express";

export const bodyValidation = (req: CadastryRequestType, res: CadastryResponseType, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return next();
};

async function cadastryUserController(req: CadastryRequestType, res: CadastryResponseType) {
  const body = req.body;

  const save = async () => {
    try {
      const response = new cadastryUser({ ...body });
      await response.cadastryUserSchema();
      if (response.error) {
        const ErrorMessage = JSON.stringify(response.error);
        throw new Error(ErrorMessage);
      } 
      return res.status(201).json();
    } catch (err) {
      const { status, message } = JSON.parse(err.message);
      return res.status(status).json(message);
    }
  };
  return save();
}

export default cadastryUserController;