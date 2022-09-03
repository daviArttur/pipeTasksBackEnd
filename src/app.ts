import dotenv from "dotenv";
dotenv.config();
import routerCadastry from "./Routes/cadastry/cadastry";
import routerAuth from "./Routes/auth/auth";
import connect from "../db/connect";
import express from "express";


const app = express();

// Connect database
connect();

// View body in request
app.use(express.json());

// Routes

//cadastry
app.use("/", routerCadastry);

//auth
app.use("/", routerAuth);

app.listen(3000);

export default app;
