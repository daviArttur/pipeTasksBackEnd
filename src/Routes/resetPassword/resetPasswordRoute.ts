import { Router } from "express";
import { body } from "express-validator";
import { resetPasswordController, handleErrors } from "../../Controller/resetPassword/resetPasswordController";
import { catchBadRequest } from "../utils/catchBadRequest";

const routerResetPassword = Router();

routerResetPassword.post("/resetPassword",
  body("email").isEmail(),
  catchBadRequest,
  resetPasswordController,
  handleErrors,
);

export { routerResetPassword };