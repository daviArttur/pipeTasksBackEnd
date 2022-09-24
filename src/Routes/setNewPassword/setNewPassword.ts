// Utils
import { catchBadRequest } from "../../Routes/utils/catchBadRequest";

// Express validator
import { body } from "express-validator";

// Express
import { Router } from "express";

// Controller
import { setNewPasswordController, handleErrors } from "../../Controller/setNewPassword/setNewPassword";

const routerSetNewPasswordPassword = Router();

routerSetNewPasswordPassword.post("/setNewPassword",
  body("password").isString(),
  body("id").isString().isLength({ min: 24, max: 24 }),
  catchBadRequest,
  setNewPasswordController,
  handleErrors,
);

export { routerSetNewPasswordPassword };