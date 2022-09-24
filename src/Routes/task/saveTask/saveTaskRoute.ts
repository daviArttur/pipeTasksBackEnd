// Utils
import { catchBadRequest } from "../../../Routes/utils/catchBadRequest";

// Express validator
import { body } from "express-validator";

// Express
import { Router } from "express";

// Controller
import { saveTaskController, handleErrors } from "../../../Controller/task/saveTask/saveTaskController";

const saveTaskRoute = Router();

saveTaskRoute.post("",
  body("userId").isString().isLength({ min: 24, max: 24 }),
  body("title").isString(),
  body("userId").isString(),
  catchBadRequest,
  saveTaskController,
  handleErrors
);

export { saveTaskRoute };