const regex = {
  email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
}

class Validation {
  name: string;
  surname: string;
  email: string;
  password: string;
  status: number;
  message: string;

  constructor(name: string, surname: string, email: string, password: string) {
    this.name = name
    this.surname = surname
    this.email = email
    this.password = password
    this.status = 201
    this.message;
    this.containMoreThanOneWord()
    this.validateEmail()
  }

  validateEmail( ) {
    const errorMessage = "O endereço de email digitado é invalido"
    const validate = regex.email.test(this.email)
    return validate ? true : (this.status = 400, this.message = errorMessage)
  }

  containMoreThanOneWord() {
    const values = [ this.name, this.surname, this.email, this.password ];
    const errorMessage = "Confira se todos os campos foram preenchidos corretamente.";

    const valuesIsValid = values.filter((value) => {
      const formatedValue = this.removeSpacing(value).split(' ')
      const ContainOneWord = formatedValue.length === 1
      return ContainOneWord ? formatedValue[0] : false
    });

    return valuesIsValid.length < 4 ? (this.status = 400, this.message = errorMessage) : true;
  }

  removeSpacing(string: string) {
    return string.trim();
  }
}

export default Validation;