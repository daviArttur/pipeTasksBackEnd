import handleErrorDb from "./handleErrorDb";

describe("describe test class that handles db error", () => {
  const comumnError = {
    errorCodeExample: "11000",
    errorMessageExample: "E11000 duplicate key error collection: test.users index: email_1 dup key:..."
  };

  it("set error method should return value error of type number", () => {
    const { errorCodeExample, errorMessageExample } = comumnError;
    const errorReturnedDb = new handleErrorDb(errorCodeExample, errorMessageExample).setError();

    expect(typeof errorReturnedDb === "number").toBeTruthy();
  });

  it("the function to return status and error message if there is already registered email", () => {
    const { errorCodeExample, errorMessageExample } = comumnError;
    const errorReturnedDb = new handleErrorDb(errorCodeExample, errorMessageExample);

    expect(typeof errorReturnedDb.message === "string").toBeTruthy();
    expect(typeof errorReturnedDb.status === "number").toBeTruthy();
  });
});