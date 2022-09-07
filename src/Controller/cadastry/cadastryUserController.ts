// Model
import cadastryUser from "../../Models/user/cadastry/cadastryUserModel";

// Validator
import { validationResult } from "express-validator";

// Types
import type { NextFunction } from "express";
import type { CadastryRequestType, CadastryResponseType } from "../../interface/cadastry/cadastryInterface";

export const bodyValidation = (req: CadastryRequestType, res: CadastryResponseType, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return next();
};

async function cadastryUserController(req: CadastryRequestType, res: CadastryResponseType): Promise<CadastryResponseType> {
  const { name, surname, email, password } = req.body;
  const body = { name, surname, email, password };

  const save = async () => {
    try {
      const response = new cadastryUser({ ...body });
      const { status, message } = await response.cadastryUserSchema();
      if (response.error) throw new Error(JSON.stringify(response.error));
      return res.status(status).json({ message: message });
    } catch (err) {
      const { status, message } = JSON.parse(err.message);
      return res.status(status).json({ errors: message });
    }
  };
  return save();
}

export default cadastryUserController;