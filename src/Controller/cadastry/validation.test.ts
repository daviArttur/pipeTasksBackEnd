import UserObjectExample from "../../helper/UserObjectExample";
import Validation from "./validation";


describe("test methods validate function", () => {

  it("should return the correct data in this body", () => {
    const User = new Validation(UserObjectExample);

    expect(User.body).toEqual(UserObjectExample);
  });
  
  it("body must have the necessary keys", () => {
    const excludeKeyObjectUser: Partial<typeof UserObjectExample> = Object.assign({}, UserObjectExample);
    delete excludeKeyObjectUser.email;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Unreachable code error
    const User = new Validation(excludeKeyObjectUser).bodyIsSatisfied();

    expect(User).toBe("Documento inválido, confira se os dados foram enviados no formato correto.");
  });


  it("remove space after and before string", () => {
    const newUserObject = {
      name: "   Davi",
      surname: "Artur    ",
      email: "   example@gmail.com  ",
      password: "  @#7daSdq4 "
    };

    const User = new Validation(newUserObject);
    User.removeSpacing();
    const { name, surname, email, password } = UserObjectExample;
    expect(User.body).toEqual({
      name,
      surname,
      email,
      password,
    });
  });

  it("return error, case, value contain more than one word", () => {
    const modifyNameUser = Object.assign({}, UserObjectExample);
    modifyNameUser.name = "Davi atur";
    const User1 = new Validation(modifyNameUser).containMoreThanOneWord();
    expect(User1).toBe("Confira se todos os campos foram preenchidos corretamente.");

    const modifySurnameUser = Object.assign({}, UserObjectExample);
    modifySurnameUser.surname = "Artur Silva";
    const User2 = new Validation(modifySurnameUser).containMoreThanOneWord();
    expect(User2).toBe("Confira se todos os campos foram preenchidos corretamente.");

    const modifyEmailUser = Object.assign({}, UserObjectExample);
    modifyEmailUser.email = "es t@exmaple.co";
    const User3 = new Validation(modifyEmailUser).containMoreThanOneWord();
    expect(User3).toBe("Confira se todos os campos foram preenchidos corretamente.");

    const modifyPasswordUser = Object.assign({}, UserObjectExample);
    modifyPasswordUser.password = "dsjhfasd asdfasdf";
    const User4 = new Validation(modifyPasswordUser).containMoreThanOneWord();
    expect(User4).toBe("Confira se todos os campos foram preenchidos corretamente.");
  });
});