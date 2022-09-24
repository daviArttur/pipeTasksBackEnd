// Bcrypt
import bcrypt from "bcryptjs";

// Model
import authModel from "../../../Models/user/auth/authModel";

class ComparePassword {
  #email: string;
  #password: string;

  constructor(email: string, password: string) {
    this.#email = email;
    this.#password = password;
  }

  compareHashPassword(UserDbPassword: string, UserId: string) {
    const compare = bcrypt.compareSync(this.#password, UserDbPassword);
    return compare ?
      { status: 200, id: UserId } 
      :
      { status: 403, message: "Email ou senha inválidos" };
  }

  async getUserDb(): Promise<{ status: number, message?: string, id?: string }> {
    try {
      const SearchUser = await new authModel(this.#email).findUser();

      if (SearchUser) {
        return this.compareHashPassword(SearchUser.password, SearchUser.id);
      } else {
        throw new Error("Email ou senha inválidos");
      }
      
    } catch (err) {
      return { status: 403, message: err.message };
    }
  }
}

export default ComparePassword;