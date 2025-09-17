import { Types } from "mongoose";
import { Request } from "express";

export interface IReqUser extends Request {
  user?: IUserToken;
}

export interface IUser {
  fullName: string;
  username: string;
  email: string;
  password: string;
  role: string;
  profilePicture: string;
  profilePictureId: string | null;
  isActive: boolean;
  activationCode: string;
  createdAt?: string;
}

export interface IUserToken extends Omit<IUser, "password" | "email" | "username" | "fullName" | "profilePicture" | "isActive" | "activationCode" | "profilePictureId"> {
  id?: Types.ObjectId;
}
