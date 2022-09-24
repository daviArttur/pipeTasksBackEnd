// Express
import { Router } from "express";

// Valitdator
import { body } from "express-validator";

// Controller
import cadastryUserController, { bodyValidation } from "../../Controller/cadastry/cadastryUserController";

const router = Router();

router.post("/cadastry",
  body("name").isString().isAlpha().notEmpty().isLength({ max: 20 }),
  body("surname").isString().isAlpha().notEmpty().isLength({ max: 20 }),
  body("email").isEmail().toLowerCase(),
  body("password").isLength({ min: 8 }),
  bodyValidation,
  cadastryUserController
);

export default router;