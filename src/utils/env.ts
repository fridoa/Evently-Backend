import dotenv from "dotenv";

dotenv.config();

export const DATABASE_URL: string = process.env.DATABASE_URL || "";

export const SALT_ROUNDS: number = Number(process.env.SALT_ROUNDS) || 12;

export const EMAIL_SMTP_SECURE: boolean = Boolean(process.env.EMAIL_SMTP_SECURE) === false;
export const EMAIL_SMTP_PASS: string = process.env.EMAIL_SMTP_PASS || "";
export const EMAIL_SMTP_USER: string = process.env.EMAIL_SMTP_USER || "";
export const EMAIL_SMTP_PORT: number = Number(process.env.EMAIL_SMTP_PORT) || 465;
export const EMAIL_SMTP_HOST: string = process.env.EMAIL_SMTP_HOST || "";
export const EMAIL_SMTP_SERVICE_NAME: string = process.env.EMAIL_SMTP_SERVICE_NAME || "";
export const CLIENT_HOST: string = process.env.CLIENT_HOST || "http://localhost:3001";

export const COUDINARY_CLOUD_NAME: string = process.env.CLOUDINARY_CLOUD_NAME || "";
export const COUDINARY_API_KEY: string = process.env.CLOUDINARY_API_KEY || "";
export const COUDINARY_API_SECRET: string = process.env.CLOUDINARY_API_SECRET || "";
