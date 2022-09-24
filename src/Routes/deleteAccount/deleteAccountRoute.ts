// Controller
import { deleteAcountController, handleErrors } from "../../Controller/deleteAccount/deleteAccountController";

// Express
import { Router } from "express";

// Validate token
import { validateToken } from "../../Controller/login/loginController";

const routerDeleteAccount = Router();

routerDeleteAccount.delete("/deleteAccount",
  validateToken,
  deleteAcountController,
  handleErrors,
);

export { routerDeleteAccount };