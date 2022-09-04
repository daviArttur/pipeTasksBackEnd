import { Router } from "express";
import authController from "../../Controller/auth/auth";

const router = Router();

router.route("/auth")
  .get(authController);

export default router;