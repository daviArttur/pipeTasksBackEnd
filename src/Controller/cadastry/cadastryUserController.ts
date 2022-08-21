import Validation from "../../Models/user/cadastry/validation";
import cadastryUser from '../../Models/user/cadastry/cadastryUserModel'

async function cadastryUserController(name: string, surname: string, email: string, password: string) {

  const User = new Validation(name, surname, email, password)
  const ValidationPassed = User.status === 201 && User.message === undefined;

  if (ValidationPassed) {
    const { name, surname, email, password} = User
    try {
      await cadastryUser({ name, surname, email, password})
      return User
    } catch (err) {
      return {status: User.status, message: User.message}
    };

  } else {
    return {status: User.status, message: User.message}
  }
}

export default cadastryUserController;