import mongoose from "mongoose";
import { encrypt } from "../utils/password";

export interface IUser {
  fullName: string;
  username: string;
  email: string;
  password: string;
  role: string;
  profilePicture: string;
  isActive: boolean;
  activationCode: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const Schema = mongoose.Schema;

const UserSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: true,
    },
    profilePicture: {
      type: String,
      default: "user.png",
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    activationCode: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  user.password = await encrypt(user.password);
  next();
});

const UserModel = mongoose.model<IUser>("User", UserSchema);
export default UserModel;
