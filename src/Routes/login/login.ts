import { Router } from "express";
import { header } from "express-validator";
import { bodyValidation, loginController, validateToken } from "../../Controller/login/loginController";

const router = Router();

router.get("/login",
  header("Authorization").notEmpty(),
  bodyValidation,
  validateToken,
  loginController,
);

export default router;