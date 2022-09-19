import { Router } from "express";
import { deleteAcountController, handleErrors } from "../../Controller/deleteAccount/deleteAccountController";
import { validateToken } from "../../Controller/login/loginController";

const routerDeleteAccount = Router();

routerDeleteAccount.delete("/deleteAccount",
  validateToken,
  deleteAcountController,
  handleErrors,
);

export { routerDeleteAccount };