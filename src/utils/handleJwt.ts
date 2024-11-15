import jwt from "jsonwebtoken";
import { UserDb } from "userTypes";

export const handleJwt = (user: UserDb) => {
  return jwt.sign(user, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
