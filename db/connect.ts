import mongoose from "mongoose";
import _db from "../config/db";
async function connect() {
  try {
    await mongoose.connect(_db.DbUrl);
    console.log("Conectado com sucesso");
  } catch (err) {
    console.log(err);
  }
}

export default connect;