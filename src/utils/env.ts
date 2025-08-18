import dotenv from "dotenv";

dotenv.config();

export const DATABASE_URL: string = process.env.DATABASE_URL || "";

export const SALT_ROUNDS: number = Number(process.env.SALT_ROUNDS) || 12;
