import * as jwt from "jsonwebtoken";

// authority for login user to query the CreateProduct
export interface AuthTokenPayload {
  userId: number;
}

export const auth = (header: string): AuthTokenPayload => {
  // header message is: Bearer token, so we need the 2nd one, index is 1
  const token = header.split(" ")[1];

  if (!token) {
    throw new Error("Invalid Token");
  }

  // first param is token, second is the our secret to decode the token
  return jwt.verify(
    token,
    process.env.TOKEN_SECRET as jwt.Secret
  ) as AuthTokenPayload;
};
