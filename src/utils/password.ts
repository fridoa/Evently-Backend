import bcrypt from "bcryptjs";
import { SALT_ROUNDS } from "./env";

export async function encrypt(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
