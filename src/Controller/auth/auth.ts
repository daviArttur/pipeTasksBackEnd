import dotenv from "dotenv";
dotenv.config();

// Helper Functions
import ComparePassword from "../../helper/login/comparePassword";
import createJwtToken from "../../helper/jwt/createJwtToken";

// Types
import type { AuthRequestType, AuthResponseType } from "../../interface/auth/authInterface";

async function authController (req: AuthRequestType, res: AuthResponseType) {
  const { email, password } = req.body;

  const { status, message, id } = await new ComparePassword(email, password).getUserDb();
  
  if (status === 200 && id) {
    const token = createJwtToken(id);
    return res.status(status).json({ token: token });
  } else if (status === 404 && message) {
    return res.status(status).json({ message: message });
  } else {
    return res.status(500).end();
  }
}

export default authController;