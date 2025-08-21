import nodemailer from "nodemailer";
import { EMAIL_SMTP_SECURE, EMAIL_SMTP_PASS, EMAIL_SMTP_USER, EMAIL_SMTP_PORT, EMAIL_SMTP_HOST, EMAIL_SMTP_SERVICE_NAME } from "../env";
import ejs from "ejs";
import path from "path";

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SMTP_SERVICE_NAME,
  host: process.env.EMAIL_SMTP_HOST,
  port: Number(process.env.EMAIL_SMTP_PORT),
  secure: process.env.EMAIL_SMTP_SECURE === "true",
  auth: {
    user: process.env.EMAIL_SMTP_USER,
    pass: process.env.EMAIL_SMTP_PASS,
  },
  requireTLS: true,
});

export interface ISendMail {
  from?: string; 
  to: string;
  subject: string;
  html: string;
}

export const sendMail = async ({ from, to, subject, html }: ISendMail) => {
  return await transporter.sendMail({
    from: from || `"Evently Support" <${process.env.EMAIL_SMTP_USER}>`, 
    to,
    subject,
    html,
  });
};

export const renderMail = async (template: string, data: any): Promise<string> => {
  const content = await ejs.renderFile(path.join(__dirname, `./templates/${template}`), data);
  return content as string;
};
