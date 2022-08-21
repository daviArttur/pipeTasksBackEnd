import { Router } from "express";
import cadastryController from "../../../Controller/cadastry/cadastryUserController";

const router = Router();

router.post('/cadastry', async (req, res) => {
  const { name, surname, email, password } = req.body
  const { status, message } = await cadastryController(name, surname, email, password)
  res.status(status).json(message)
});

export default router;