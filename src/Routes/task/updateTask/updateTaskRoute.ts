// Handle errors
import { handleErrors, updateTaskController } from "../../../Controller/task/updateTask/updateTaskController";

// Utils
import { catchBadRequest } from "../../../Routes/utils/catchBadRequest";

// Express
import { Router } from "express";

// Validator
import { body } from "express-validator";

const updateTaskRoute = Router();

updateTaskRoute.patch("",
  body("taskId").isString().isLength({ min: 24, max: 24 }),
  body("title").isString().optional(),
  body("description").isString().optional(),
  catchBadRequest,
  updateTaskController,
  handleErrors
);

export { updateTaskRoute };