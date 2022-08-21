import mongoose, { Schema } from "mongoose";

interface IcreateUser {
  name: string,
  surname: string,
  email: string,
  password: string
};

const userSchema = new Schema({
  name: String,
  surname: String,
  email: String,
  password: {
    type: String,
    select: false
  }
});

async function cadastryUserModel({name, surname, email, password}: IcreateUser) {
  const modelUser = mongoose.model('User', userSchema)
  const User = new modelUser({name, surname, email, password})
  try {
    await User.save()
  } catch(err) {
    console.log(err)
  }
};

export default cadastryUserModel;