import { Router, NextFunction, Request, Response } from "express";
import { validateToken } from "../../Controller/token/validateToken";
import { getTaskController } from "../../Controller/task/getTask/getTaskController";
const router = Router();

router.use(validateToken);

router.get("/get/:limit", getTaskController);

router.post("/create");

router.patch("/update");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.use((err: Error, _req: Request, res: Response, _next: NextFunction ) => {
  
  return res.status(500).json({ errors: err.message });
});

export default router;
