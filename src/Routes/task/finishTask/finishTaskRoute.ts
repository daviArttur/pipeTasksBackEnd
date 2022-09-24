// Express validator
import { body } from "express-validator";

// Express
import { Router } from "express";

// Utils
import { catchBadRequest } from "../../../Routes/utils/catchBadRequest";

// Controller
import { finishTaskController, handleErrors } from "../../../Controller/task/finishTask/finishTaskController";

const finishTaskRoute = Router();

finishTaskRoute.patch("/finish",
  body("finished.at"),
  body("finished.status"),
  catchBadRequest,
  finishTaskController,
  handleErrors,
);