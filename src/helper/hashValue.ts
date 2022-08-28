import bcrypt from "bcryptjs";
// eslint-disable-next-line @typescript-eslint/no-var-requires

function hashValue(password: string) {
  const hash = bcrypt.hashSync(password);

  return hash;
}

export default hashValue;