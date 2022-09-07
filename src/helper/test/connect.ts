import mongoose from "mongoose";

const connect = async (user: string, password: string) => {
  return await mongoose.connect(`mongodb+srv://${user}:${password}@tests.nd7hvei.mongodb.net/?retryWrites=true&w=majority`);
};

export default connect;