import dotenv from "dotenv";
dotenv.config();
import router from "./Routes/routes";
import connect from "../db/connect";
import express from "express";


const app = express();

// Connect database
connect();

// View body in request
app.use(express.json());

// Routes
app.use("/", router);

app.listen(3000);

export default app;
