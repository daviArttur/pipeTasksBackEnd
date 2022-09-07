
import mongoose from "mongoose";
import { schema } from "../../Models/user/login/loginModel";
import bcrypt from "bcryptjs";

const loginSchema = mongoose.model("users", schema);

class ComparePassword {
  #email: string;
  #password: string;

  constructor(email: string, password: string) {
    this.#email = email;
    this.#password = password;
  }

  async getUserDb(): Promise<{ status: number, message?: string, id?: string }> {
    try {
      const SearchUser = await loginSchema.findOne({ email: this.#email });
      const User = SearchUser;
      if (SearchUser && User) {
        return this.compareHashPassword(User.password, User.id);
      } else {
        throw new Error("Email ou senha inválidos");
      }
      
    } catch (err) {
      return { status: 403, message: err.message };
    }
  }

  compareHashPassword(UserDbPassword: string, UserId: string) {
    const compare = bcrypt.compareSync(this.#password, UserDbPassword);
    return compare ?
      { status: 200, id: UserId } 
      :
      { status: 403, message: "Email ou senha inválidos" };
  }
}

export default ComparePassword;