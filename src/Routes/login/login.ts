// Controller
import { bodyValidation, loginController, validateToken } from "../../Controller/login/loginController";

// Express validator
import { header } from "express-validator";

// Express
import { Router } from "express";

const router = Router();

router.get("/login",
  header("Authorization").notEmpty(),
  bodyValidation,
  validateToken,
  loginController,
);

export default router;