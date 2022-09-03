import { Router } from "express";
import loginController from "../../Controller/login/loginController";

const router = Router();

router.route("/auth")
  .get(loginController);

export default router;