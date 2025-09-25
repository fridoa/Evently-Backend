import { Types } from "mongoose";
import { Request } from "express";
import { IUser } from "../models/user.model";

export interface IReqUser extends Request {
  user?: IUserToken;
}

export interface IUserToken extends Omit<IUser, "password" | "email" | "username" | "fullName" | "profilePicture" | "profilePictureId" | "isActive" | "activationCode"> {
  id?: Types.ObjectId;
}

export interface IPaginationQuery {
  page: number;
  limit: number;
  search?: string;
}
