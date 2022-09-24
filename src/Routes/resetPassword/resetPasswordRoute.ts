// Utils
import { catchBadRequest } from "../utils/catchBadRequest";
// Express validator
import { body } from "express-validator";

// Express
import { Router } from "express";

// Controller
import { resetPasswordController, handleErrors } from "../../Controller/resetPassword/resetPasswordController";

const routerResetPassword = Router();

routerResetPassword.post("/resetPassword",
  body("email").isEmail(),
  catchBadRequest,
  resetPasswordController,
  handleErrors,
);

export { routerResetPassword };