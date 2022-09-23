import { Router } from "express";
import { body } from "express-validator";
import { setNewPasswordController, handleErrors } from "../../Controller/setNewPassword/setNewPassword";
import { catchBadRequest } from "../../Routes/utils/catchBadRequest";

const routerSetNewPasswordPassword = Router();

routerSetNewPasswordPassword.post("/setNewPassword",
  body("password").isString(),
  body("id").isString().isLength({ min: 24, max: 24 }),
  catchBadRequest,
  setNewPasswordController,
  handleErrors,
);

export { routerSetNewPasswordPassword };