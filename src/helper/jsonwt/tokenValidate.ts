import dotenv from "dotenv";
import jwt, { JwtPayload } from "jsonwebtoken";
dotenv.config();

interface IDecodeToken {
  status: number;
  id?: string;
  errors?: string;
}

export class DecodeToken {
  protected token: string;

  constructor(JwtToken: string) {
    this.token = JwtToken;
  }

  private format(token: string) {
    return token.split(" ")[1];
  }

  public decode(): IDecodeToken {
    try {
      const formatedToken = this.format(this.token);
      const result = jwt.verify(formatedToken!, process.env.JWT_SECRET!) as JwtPayload & { id: string };
      if (!result.id) throw new Error(JSON.stringify(result));
      return { status: 200, id: result.id };
    } catch (err) {
      return this.handleError(err.message);
    }
  }

  private handleError(message: string) {
    switch (message) {
    case "jwt expired":
      return { status: 403, errors: message };
    case "jwt malformed":
      return { status: 400, errors: message };
    case "invalid signature":
      return { status: 403, errors: message };
    case "invalid token":
      return { status: 403, errors: message };
    default:
      return { status: 500, errors: "Server error" };
    }
  }
}