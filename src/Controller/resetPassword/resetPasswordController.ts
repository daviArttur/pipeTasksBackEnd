import { NextFunction } from "express";
import nodemailer from "nodemailer";
import { resetPasswordRequestType, resetPasswordResponseType } from "../../interface/resetPassword/resetPasswordInterface";
import { userModel } from "../../Models/user/user";
import dotenv from "dotenv";
dotenv.config();
class Controller {
  private email: string;
  private res: resetPasswordResponseType;
  private next: NextFunction;

  constructor(req: resetPasswordRequestType, res: resetPasswordResponseType, next: NextFunction) {
    this.email = req.body.email;
    this.res = res;
    this.next = next;
  }

  private buildTransporter() {
    return nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // upgrade later with STARTTLS
      auth: {
        user: "pipetasks@gmail.com",
        pass: process.env.EMAIL_CREDENTIAL
      },
      tls: {
        rejectUnauthorized: false
      },
    });
  }

  private async getUserId() {
    try {
      const User = await userModel.findOne({ email: this.email });
      if (!User) throw new Error("No users were found with this email");
      return User._id;
    } catch (err) {
      return err;
    }
  }

  private configTransport(userId: string) {
    return {
      from: "exam@server.com",
      to: this.email,
      subject: "Message title",
      text: "Plaintext version of the message",
      html: `<a href="http://localhost:3005/reset/${userId}">Clique aqui para resetar sua senha</a>`
    };
  }

  public async sendEmail() {
    try {
      const userId = await this.getUserId();
      const address = this.configTransport(userId);
      if (!userId._id) throw new Error(userId.message);
      await this.buildTransporter().sendMail(address);
      return this.res.status(200).json({ message: "email sent successfully" });
    } catch (err) {
      return this.next(err);
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleErrors = (err: Error, _req: resetPasswordRequestType, res: resetPasswordResponseType, _next: NextFunction) => {
  switch (err.message) {
  case "No users were found with this email":
    return res.status(400).json({ errors: err.message });
  default:
    return res.status(500).json({ errors: err.message });
  }
};

const resetPasswordController = async (req: resetPasswordRequestType, res: resetPasswordResponseType, next: NextFunction) => {
  return await new Controller(req, res, next).sendEmail();
};

export { resetPasswordController, handleErrors };