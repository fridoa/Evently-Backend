import { Types } from "mongoose";
import { IUser } from "../models/user.model";
import jwt from "jsonwebtoken";
import { SALT_ROUNDS } from "./env";
import { IUserToken } from "./interfaces";



export const generateToken = (user: IUserToken): string => {
  const token = jwt.sign(user, SALT_ROUNDS.toString(), {
    expiresIn: "1h",
  });
  return token;
};

export const getUserData = (token: string) => {
  const user = jwt.verify(token, SALT_ROUNDS.toString()) as IUserToken;
  return user;
};
