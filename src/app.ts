import express from "express";
import dotenv from "dotenv";
dotenv.config();

// Router
import routerCadastry from "./Routes/cadastry/cadastry";
import routerAuth from "./Routes/auth/auth";
import routerLogin from "./Routes/login/login";

// Connect DB
import connectDevDB from "../db/connect";
import connectTestDB from "./helper/test/connect";

if (process.env.NODE_ENV === "test" || process.env.ENVIROMENT === "production") {
  connectTestDB(process.env.DB_USER!, process.env.DB_PASS!);
} else {
  console.log("Dev DB");
  connectDevDB();
}

const app = express();

// Connect database

if (process.env.NODE_ENV !== "test") {
  app.listen(3000);
}

app.use(express.json());

// Routes

app.use("/", routerCadastry);

app.use("/", routerAuth);

app.use("/", routerLogin);

export default app;