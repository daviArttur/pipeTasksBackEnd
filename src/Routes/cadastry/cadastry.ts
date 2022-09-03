import { Router } from "express";
import cadastryController from "../../Controller/cadastry/cadastryUserController";

const router = Router();

router.route("/cadastry")
  .post(cadastryController);

export default router;