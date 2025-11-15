import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

export const {
  SMTP_HOST,
  SMTP_AUTH_USER,
  SMTP_AUTH_PASSWORD,
  SMTP_SECURE,
  SMTP_PORT,
  SMTP_MAIL_FROM,
} = {
  SMTP_HOST: z.string().parse(process.env.SMTP_HOST),
  SMTP_PORT: z
    .string()
    .transform((val) => Number(val))
    .parse(process.env.SMTP_PORT),
  SMTP_SECURE: z.string().parse(process.env.SMTP_SECURE),
  SMTP_AUTH_USER: z.string().parse(process.env.SMTP_AUTH_USER),
  SMTP_AUTH_PASSWORD: z.string().parse(process.env.SMTP_AUTH_PASSWORD),
  SMTP_MAIL_FROM: z.string().parse(process.env.SMTP_MAIL_FROM),
};
