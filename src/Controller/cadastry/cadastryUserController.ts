import BodyValidation from "./validation";
import cadastryUser from "../../Models/user/cadastry/cadastryUserModel";
import { Request, Response } from "express";

async function cadastryUserController(req: Request, res: Response) {
  const { status, message, body } = new BodyValidation(req.body);

  const ValidationPassed = status === 201 && message === undefined;

  if (ValidationPassed) {
    const save = async () => {
      try {
        const response = new cadastryUser({ ...body });
        await response.cadastryUserSchema();
        
        const ErrorInString = JSON.stringify(response.error);
        if (response.error) throw new Error(ErrorInString);
        return res.status(201).json();
      } catch (err) {
        const { status, message } = JSON.parse(err.message);
        return res.status(status).json(message);
      }
    };
    return save();
  } else {
    return res.status(status).json(message);
  }
}

export default cadastryUserController;