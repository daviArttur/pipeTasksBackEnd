import { Router } from "express";

// Controller
import authController from "../../Controller/auth/auth";

const router = Router();

router.route("/auth")
  .get(authController);

export default router;