import { Router } from "express";
import { body } from "express-validator";
import cadastryUserController, { bodyValidation } from "../../Controller/cadastry/cadastryUserController";

const router = Router();

router.use(bodyValidation);

router.route("/cadastry")
  .post([
    body("name").isString().isAlpha().notEmpty().isLength({ max: 20 }),
    body("surname").isString().isAlpha().notEmpty().isLength({ max: 20 }),
    body("email").isEmail().toLowerCase(),
    body("password").isLength({ min: 8 })
  ], cadastryUserController);

export default router;