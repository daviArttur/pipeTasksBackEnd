import Validation from "./validation";

const UserInputValues = {
  name: "Davi",
  surname: "Artur",
  email: "test@exmaple.com",
  password: "Ex@mple123asd"
};

describe("test methods validate function", () => {

  it("should return the correct data in this body", () => {
    const User = new Validation(UserInputValues);

    expect(User.body).toEqual(UserInputValues);
  });
  
  it("body must have the necessary keys", () => {
    const excludeKeyObjectUser: Partial<typeof UserInputValues> = Object.assign({}, UserInputValues);
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
      email: "   test@exmaple.com  ",
      password: "  Ex@mple123asd "
    };

    const User = new Validation(newUserObject);
    User.removeSpacing();

    expect(User.body).toEqual(UserInputValues);
  });

  it("return error, case, value contain more than one word", () => {
    const modifyNameUser = Object.assign({}, UserInputValues);
    modifyNameUser.name = "Davi atur";
    const User1 = new Validation(modifyNameUser).containMoreThanOneWord();
    expect(User1).toBe("Confira se todos os campos foram preenchidos corretamente.");

    const modifySurnameUser = Object.assign({}, UserInputValues);
    modifySurnameUser.surname = "Artur Silva";
    const User2 = new Validation(modifySurnameUser).containMoreThanOneWord();
    expect(User2).toBe("Confira se todos os campos foram preenchidos corretamente.");

    const modifyEmailUser = Object.assign({}, UserInputValues);
    modifyEmailUser.email = "es t@exmaple.co";
    const User3 = new Validation(modifyEmailUser).containMoreThanOneWord();
    expect(User3).toBe("Confira se todos os campos foram preenchidos corretamente.");

    const modifyPasswordUser = Object.assign({}, UserInputValues);
    modifyPasswordUser.password = "dsjhfasd asdfasdf";
    const User4 = new Validation(modifyPasswordUser).containMoreThanOneWord();
    expect(User4).toBe("Confira se todos os campos foram preenchidos corretamente.");
  });
});