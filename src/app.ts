import dotenv from "dotenv";
dotenv.config();
import routerCadastry from "./Routes/cadastry/cadastry";
import routerAuth from "./Routes/auth/auth";
import connectDevDB from "../db/connect";
import express from "express";
import connectTestDB from "./helper/test/connect";


const app = express();

console.log(process.env.NODE_ENV);
// Connect database
if (process.env.NODE_ENV !== "test") {
  app.listen(3000);
} else {
  app.listen(3001);
}

if (process.env.NODE_ENV === "test" || process.env.ENVIROMENT === "production") {
  connectTestDB(process.env.DB_USER!, process.env.DB_PASS!);
} else {
  connectDevDB();
}

// View body in request
app.use(express.json());

// Routes

//cadastry
app.use("/", routerCadastry);

//auth
app.use("/", routerAuth);



export default app;
