import { IUser } from "../models/user.model";
import { CLIENT_HOST, EMAIL_SMTP_USER } from "../utils/env";
import { renderMail, sendMail } from "../utils/mail/mail";

export async function sendActivationEmail(user: IUser) {
  const contentMail = await renderMail("registration-success.ejs", {
    username: user.username,
    fullName: user.fullName,
    email: user.email,
    createdAt: user.createdAt,
    activationLink: `${CLIENT_HOST}/auth/activation/${user.activationCode}`,
  });
  await sendMail({
    to: user.email,
    subject: "Aktivasi Akun Evently",
    html: contentMail,
  });
}
