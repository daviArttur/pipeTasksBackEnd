import dotenv from "dotenv";
dotenv.config();

const dbUsername = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

export default {
  DbUrl: `mongodb+srv://${dbUsername}:${dbPassword}@cluster0.xjw0jbt.mongodb.net/?retryWrites=true&w=majority`,
  PORT: 3000
};