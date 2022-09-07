import dotenv from "dotenv";
dotenv.config();
import routerCadastry from "./Routes/cadastry/cadastry";
import routerAuth from "./Routes/auth/auth";
import connectDevDB from "../db/connect";
import express from "express";
import connectTestDB from "./helper/test/connect";


const app = express();

const PORT = process.env.PORT;


console.log(process.env.PORT);
// Connect database

async function a() {
  if (PORT === "4000") {
    await connectDevDB();
  } else if (PORT === "3000") {
    await connectTestDB(process.env.DB_USER!, process.env.DB_PASS!);
  }
}
a();
app.listen(PORT);

// View body in request
app.use(express.json());

// Routes

//cadastry
app.use("/", routerCadastry);

//auth
app.use("/", routerAuth);



export default app;
