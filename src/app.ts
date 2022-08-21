require("dotenv").config()
import connect from "../db/connect"
import express from "express"

// Route
import cadastry from "./Views/Routes/cadastry/cadastryUserView"

const app = express()

// Connect database
connect()

// View body in request
app.use(express.json())

// Cadastry user
app.post("/cadastry", cadastry)

app.listen(3000)

export default app
