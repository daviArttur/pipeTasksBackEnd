import { Router } from "express";
import { body } from "express-validator";
import { catchBadRequest } from "../../../Routes/utils/catchBadRequest";
import { finishTaskController, handleErrors } from "../../../Controller/task/finishTask/finishTaskController";
const finishTaskRoute = Router();

finishTaskRoute.patch("/finish",
  body("finished.at"),
  body("finished.status"),
  catchBadRequest,
  finishTaskController,
  handleErrors,
);