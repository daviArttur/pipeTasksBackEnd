import { NextFunction } from "express";
import hashValue from "../../helper/hashValue";
import { setNewPasswordRequestType, setNewPasswordResponseType } from "../../interface/setNewPassword/setNewPassword";
import { userModel } from "../../Models/user/user";

class Controller {
  private password: string;
  private id: string;
  private res: setNewPasswordResponseType;
  private next: NextFunction;

  constructor(req: setNewPasswordRequestType, res: setNewPasswordResponseType, next: NextFunction) {
    this.password = req.body.password;
    this.id = req.body.id;
    this.res = res;
    this.next = next;
  }

  private getHashedPassword() {
    const hashedPassword = hashValue(this.password);
    return hashedPassword;
  }

  public async setNewPassword() {
    try {
      const User = await userModel.findByIdAndUpdate(this.id, { password: this.getHashedPassword() });
      if (!User) throw new Error("User don't exist");
      return this.res.status(200).json({ message: "successful sended email" });
    } catch (err) {
      return this.next(err);
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleErrors = (err: Error, _req: setNewPasswordRequestType, res: setNewPasswordResponseType, _next: NextFunction) => {
  switch (err.message) {
  case "User don't exist":
    return res.status(400).json({ errors: err.message });
  default:
    return res.status(500).json({ errors: err.message });
  }
};

const setNewPasswordController = async (req: setNewPasswordRequestType, res: setNewPasswordResponseType, next: NextFunction) => {
  return await new Controller(req, res, next).setNewPassword();
};

export { setNewPasswordController, handleErrors };