class handleErrorDb {
  #errorCode: number;
  status: number;
  message: string;

  constructor(errorCode: string | undefined | number, errorMessage: string) {
    this.#errorCode = errorCode ? Number(errorCode) : 0;
    this.status;
    this.message = errorMessage;
    this.setError();
  }

  setError(): number | null {
    switch (this.#errorCode) {
    case 11000:
      return this.status = 409;
    default: 
      return this.status = 500;
    }
  }
}

export default handleErrorDb;