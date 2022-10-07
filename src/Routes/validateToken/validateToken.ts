import { Request, Response, Router } from "express";
import { validateToken } from "../../Controller/login/loginController";

const validateTokenRoute = Router();

validateTokenRoute.use(validateToken);

const isValid = (_req: Request, res: Response) => {
   return res.status(200).json({ message: "User is valid" })
}

validateTokenRoute.get("/validate/token",
   isValid
);

export default validateTokenRoute;