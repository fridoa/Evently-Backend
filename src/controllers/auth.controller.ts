import { Request, Response } from "express";
import UserModel from "../models/user.model";
import { verifyPassword } from "../utils/password";
import { generateToken } from "../utils/jwt";
import { IReqUser } from "../middlewares/auth.middleware";
import { TLogin, TRegister, registerSchema, loginSchema } from "../validators/auth.schema";

export default {
  async register(req: Request, res: Response) {
    /**
     #swagger.summary = "Register a new user"
     #swagger.tags = ["Auth"]
      #swagger.requestBody = {
        required: true,
        schema: {$ref: "#/components/schemas/RegisterRequest"}
      }
     */
    try {
      const data: TRegister = await registerSchema.validate(req.body);

      const result = new UserModel(data);
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
    /**
    #swagger.summary = "Login user"
    #swagger.tags = ["Auth"]
     #swagger.requestBody = {
     required: true,
     schema: {$ref: "#/components/schemas/LoginRequest"}
     }
     */
    try {
      const { identifier, password }: TLogin = await loginSchema.validate(req.body);
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

      // generate token
      const token = generateToken({
        id: userByIdentifier._id,
        role: userByIdentifier.role,
      });

      res.status(200).json({
        message: "Login successful!",
        data: token,
      });
    } catch (error) {
      const err = error as unknown as Error;
      res.status(400).json({
        message: err.message,
        data: null,
      });
    }
  },

  async me(req: IReqUser, res: Response) {
    /**
     #swagger.tags = ["Auth"]
     #swagger.security = [{
       "bearerAuth": []
     }]
     */
    try {
      const user = req.user;
      const result = await UserModel.findById(user?.id);

      res.status(200).json({
        message: "Success get user profile!",
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
};
