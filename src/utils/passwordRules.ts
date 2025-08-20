import * as yup from "yup";

export const passwordRules = {
  min: yup.string().min(6, "Password must be at least 6 characters"),
  max: yup.string().max(20, "Password must be at most 20 characters"),
  upper: yup.string().matches(/[A-Z]/, "Password must contain at least one uppercase letter"),
  lower: yup.string().matches(/[a-z]/, "Password must contain at least one lowercase letter"),
  number: yup.string().matches(/[0-9]/, "Password must contain at least one number"),
  special: yup.string().matches(/[@$!%*?&]/, "Password must contain at least one special character"),
};
