import { Request, Response } from "express";
import * as Yup from "yup";
import UserModel from "../models/user.model";
import { verifyPassword } from "../utils/password";

type TRegister = {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type TLogin = {
  identifier: string;
  password: string;
};

const registerValidateSchema = Yup.object({
  fullName: Yup.string().required(),
  username: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().required(),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password")], "Passwords must be~ match"),
});

export default {
  async register(req: Request, res: Response) {
    const { fullName, username, email, password, confirmPassword } = req.body as unknown as TRegister;
    try {
      await registerValidateSchema.validate({
        fullName,
        username,
        email,
        password,
        confirmPassword,
      });

      const result = new UserModel({
        fullName,
        username,
        email,
        password,
      });
      await result.save();

      res.status(200).json({
        message: "Registration successful!",
        data: result,
      });
    } catch (error) {
      const err = error as unknown as Error;
      res.status(400).json({
        message: err.message,
        data: null,
      });
    }
  },

  async login(req: Request, res: Response) {
    const { identifier, password } = req.body as unknown as TLogin;
    try {
      // ambil data user berdasarkan "identifier" -> email atau username
      const userByIdentifier = await UserModel.findOne({
        $or: [
          {
            email: identifier,
          },
          {
            username: identifier,
          },
        ],
      });

      if (!userByIdentifier) {
        return res.status(404).json({
          message: "User not found",
          data: null,
        });
      }
      // verifikasi password
      const validatePassword: boolean = await verifyPassword(password, userByIdentifier.password);
      if (!validatePassword) {
        return res.status(404).json({
          message: "User not found",
          data: null,
        });
      }

      res.status(200).json({
        message: "Login successful!",
        data: userByIdentifier,
      });
    } catch (error) {
      const err = error as unknown as Error;
      res.status(400).json({
        message: err.message,
        data: null,
      });
    }
  },
};
