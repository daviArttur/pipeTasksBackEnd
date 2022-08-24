const regex = {
  email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
};

interface Ibody {
  name: string;
  surname: string;
  email: string;
  password: string;
}

class Validation {
  status: number;
  message: string;
  body: {
    name: string;
    surname: string;
    email: string;
    password: string;
  };

  constructor(body: Ibody) {
    this.status = 201;
    this.message;
    this.body = {
      ...body
    };
    this.bodyIsSatisfied();
  }

  bodyIsSatisfied() {
    const keys = {
      name: "",
      surname: "",
      email: "",
      password: "",
    };
    const body = this.body;
    const BodyKeysEqual = JSON.stringify(Object.keys(keys)) === JSON.stringify(Object.keys(body));
    
    if (BodyKeysEqual) {
      this.removeSpacing();
      this.validateEmail();
      this.containMoreThanOneWord();
      return true;
    } else {
      this.status = 406;
      return this.message = "Documento inválido, confira se os dados foram enviados no formato correto.";
    }
  }

  removeSpacing() {
    this.body.name = this.body.name.trim();
    this.body.surname = this.body.surname.trim();
    this.body.email = this.body.email.trim();
    this.body.password =  this.body.password.trim();
  }

  validateEmail( ) {
    const errorMessage = "O endereço de email digitado é invalido";
    const validate = regex.email.test(this.body.email);
    return validate ? true : (this.status = 400, this.message = errorMessage);
  }

  containMoreThanOneWord() {
    const values = [ this.body.name, this.body.surname, this.body.email, this.body.password ];
    const errorMessage = "Confira se todos os campos foram preenchidos corretamente.";
    const valuesIsValid = values.filter((value) => {
      const formatedValue = value.trim().split(" ");
      const ContainOneWord = formatedValue.length === 1;
      return ContainOneWord ? formatedValue[0] : false;
    });

    return valuesIsValid.length < 4 ? (this.status = 400, this.message = errorMessage) : true;
  }
}

export default Validation;