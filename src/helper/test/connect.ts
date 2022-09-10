import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const connect = async (user?: string, password?: string) => {
  const USER = process.env.DB_USER || user;
  const PASSWORD = process.env.DB_PASS || password;
  return await mongoose.connect(`mongodb+srv://${USER}:${PASSWORD}@tests.nd7hvei.mongodb.net/?retryWrites=true&w=majority`);
};

export default connect;