import * as Yup from "yup";
import { passwordRules } from "../utils/passwordRules";

// Schema untuk Register
export const registerSchema = Yup.object({
  fullName: Yup.string().required("Full name is required"),
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required").concat(passwordRules.min).concat(passwordRules.max).concat(passwordRules.upper).concat(passwordRules.lower).concat(passwordRules.number).concat(passwordRules.special),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

// Schema untuk Login
export const loginSchema = Yup.object({
  identifier: Yup.string().required("Username or Email is required"),
  password: Yup.string().required("Password is required"),
});

// Types otomatis dari Yup
export type TRegister = Yup.InferType<typeof registerSchema>;
export type TLogin = Yup.InferType<typeof loginSchema>;
