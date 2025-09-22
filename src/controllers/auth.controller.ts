import { Request, Response } from "express";
import UserModel from "../models/user.model";
import { verifyPassword } from "../utils/password";
import { generateToken } from "../utils/jwt";
import { TLogin, TRegister, registerSchema, loginSchema } from "../validators/auth.schema";
import { sendActivationEmail } from "../services/user.service";
import { IReqUser } from "../utils/interfaces";
import response from "../utils/response";

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

      const user = new UserModel(data);
      await user.save();

      // Send Email
      await sendActivationEmail(user);

      response.success(res, user, "User registered successfully! Please check your email to activate your account");
    } catch (error) {
      response.error(res, error, "failed registration");
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
        isActive: true,
      });

      // jika user tidak ditemukan
      if (!userByIdentifier) {
        return response.unauthorized(res, "User not found");
      }

      // verifikasi password
      const validatePassword: boolean = await verifyPassword(password, userByIdentifier.password);
      if (!validatePassword) {
        return response.unauthorized(res, "User not found");
      }

      // generate token
      const token = generateToken({
        id: userByIdentifier._id,
        role: userByIdentifier.role,
      });

      response.success(res, token, "Login successful");
    } catch (error) {
      response.error(res, error, "failed login");
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

      response.success(res, result, "Fetch user profile successfully");
    } catch (error) {
      response.error(res, error, "failed fetch user profile");
    }
  },

  async activation(req: Request, res: Response) {
    /**
      #swagger.summary = "Activate user account"
      #swagger.tags = ["Auth"]
      #swagger.requestBody = {
        required: true,
        schema: {$ref: "#/components/schemas/ActivationRequest"}
      }
     */
    try {
      const { code } = req.body as { code: string };

      const user = await UserModel.findOneAndUpdate(
        {
          activationCode: code,
        },
        {
          isActive: true,
        },
        {
          new: true,
        }
      );

      response.success(res, user, "Account activated successfully");
    } catch (error) {
      response.error(res, error, "failed activate account");
    }
  },
};
