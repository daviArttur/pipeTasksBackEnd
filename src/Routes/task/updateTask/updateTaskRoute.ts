import { Router } from "express";
import { body } from "express-validator";
import { catchBadRequest } from "../../../Routes/utils/catchBadRequest";
import { handleErrors, updateTaskController } from "../../../Controller/task/updateTask/updateTaskController";
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