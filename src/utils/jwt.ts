import { Types } from "mongoose";
import { IUser } from "../models/user.model";
import jwt from "jsonwebtoken";
import { SALT_ROUNDS } from "./env";

export interface IUserToken extends Omit<IUser, "password" | "email" | "username" | "fullName" | "profilePicture" | "isActive" | "activationCode"> {
  id?: Types.ObjectId;
}

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
