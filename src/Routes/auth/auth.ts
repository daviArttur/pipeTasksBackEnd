// Express
import { Router } from "express";

// Body
import { body } from "express-validator";

// Controller
import { authController, bodyValidation } from "../../Controller/auth/authController";

const router = Router();

router.post("/auth", 
  body("email").toLowerCase().isEmail(),
  body("password").isString(),
  bodyValidation,
  authController
);

export default router;